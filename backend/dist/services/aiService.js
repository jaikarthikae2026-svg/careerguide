import { GoogleGenAI } from '@google/genai';
function getApiKey(customApiKey) {
    return (customApiKey && customApiKey.trim()) || process.env.GEMINI_API_KEY || '';
}
function getModelName() {
    return process.env.GEMINI_MODEL || 'gemini-2.5-flash';
}
function createGenAIClient(customApiKey) {
    const key = getApiKey(customApiKey);
    if (!key)
        return null;
    return new GoogleGenAI({ apiKey: key });
}
export const aiService = {
    getAiStatus(customApiKey) {
        const key = getApiKey(customApiKey);
        return {
            provider: key ? 'gemini' : 'mock',
            model: getModelName(),
            isAvailable: Boolean(key),
            configuredVia: customApiKey ? 'client-header' : process.env.GEMINI_API_KEY ? 'environment' : 'none',
        };
    },
    async chatWithCareerMentor(messages, studentContext = {}, customApiKey) {
        const ai = createGenAIClient(customApiKey);
        const lastUserMessage = messages[messages.length - 1]?.content || '';
        // Smart fallback if no API key is set
        if (!ai) {
            return {
                message: fallbackMentorResponse(lastUserMessage, studentContext),
                provider: 'mock',
            };
        }
        try {
            const systemInstruction = `You are CareerOS AI, a world-class, empathetic, and strategic career coach and placement mentor for engineering students.
Student Profile:
- Name: ${studentContext.name || 'Student'}
- Target Role: ${studentContext.targetRole || 'Software Engineer'}
- Target Company: ${studentContext.targetCompany || 'TechNova'}
- Placement Readiness Score: ${studentContext.readinessScore ?? 72}%
- Level: ${studentContext.level ?? 12} (${studentContext.xp ?? 1250} XP)
- Strong Skills: ${(studentContext.strongSkills || ['Python', 'Arrays', 'OOP']).join(', ')}
- Priority Improvement Skills: ${(studentContext.weakSkills || ['Trees', 'Operating Systems', 'System Design']).join(', ')}
- Wellbeing status: ${studentContext.wellbeing || 'FOCUSED'}

Guidelines:
1. Provide concise, highly actionable, and realistic advice tailored directly to their current target and skill gaps.
2. Structure answers with clean bullet points or short paragraphs.
3. If the student discusses stress, anxiety, or feeling overwhelmed, be deeply empathetic, prioritize mental health, suggest taking a break, and offer a confidential counsellor referral.
4. Keep responses focused on actionable steps (e.g. specific topics to review, problem patterns to practice, interview structures like Context-Action-Result).`;
            const formattedContents = messages.map((m) => `${m.role === 'user' ? 'Student' : 'CareerOS AI'}: ${m.content}`).join('\n\n');
            const response = await ai.models.generateContent({
                model: getModelName(),
                contents: `${systemInstruction}\n\nConversation:\n${formattedContents}\n\nCareerOS AI:`,
            });
            const responseText = response.text || '';
            return {
                message: responseText.trim() || fallbackMentorResponse(lastUserMessage, studentContext),
                provider: 'gemini',
            };
        }
        catch (err) {
            console.warn('Gemini chat API error, falling back to smart response:', err.message);
            return {
                message: `${fallbackMentorResponse(lastUserMessage, studentContext)}\n\n*(Note: Running in offline mode - ${err.message || 'Check Gemini API Key'})*`,
                provider: 'mock',
            };
        }
    },
    async evaluateInterviewAnswer(params, customApiKey) {
        const ai = createGenAIClient(customApiKey);
        if (!ai) {
            return fallbackInterviewEvaluation(params.question, params.answer);
        }
        try {
            const prompt = `You are a senior tech interviewer evaluating a student's answer.
Interview Type: ${params.type}
Target Company: ${params.companyName || 'Tech Company'}
Question: "${params.question}"
Candidate Answer: "${params.answer}"

Evaluate the candidate objectively and respond strictly in valid JSON format matching this schema:
{
  "score": <number 0-100>,
  "technicalScore": <number 0-10>,
  "communicationScore": <number 0-10>,
  "clarityScore": <number 0-10>,
  "structureScore": <number 0-10>,
  "feedback": "<2-3 concise summary sentences>",
  "strengths": ["<strength 1>", "<strength 2>"],
  "improvements": ["<actionable improvement 1>", "<actionable improvement 2>"],
  "idealAnswer": "<2-3 sentence exemplary answer demonstrating ideal depth and trade-offs>"
}`;
            const response = await ai.models.generateContent({
                model: getModelName(),
                contents: prompt,
                config: {
                    responseMimeType: 'application/json',
                },
            });
            const text = response.text || '{}';
            const parsed = JSON.parse(text);
            return {
                score: Number(parsed.score) || 75,
                technicalScore: Number(parsed.technicalScore) || 7.5,
                communicationScore: Number(parsed.communicationScore) || 7.5,
                clarityScore: Number(parsed.clarityScore) || 7.5,
                structureScore: Number(parsed.structureScore) || 7.5,
                feedback: String(parsed.feedback || 'Good structured response.'),
                strengths: Array.isArray(parsed.strengths) ? parsed.strengths : ['Clear articulation of core concepts'],
                improvements: Array.isArray(parsed.improvements) ? parsed.improvements : ['Mention concrete engineering trade-offs and complexity'],
                idealAnswer: parsed.idealAnswer || undefined,
                provider: 'gemini',
            };
        }
        catch (err) {
            console.warn('Gemini interview evaluation error, falling back:', err.message);
            const fallback = fallbackInterviewEvaluation(params.question, params.answer);
            fallback.feedback += ` (Gemini offline: ${err.message || 'error'})`;
            return fallback;
        }
    },
    async generateInterviewQuestion(params, customApiKey) {
        const ai = createGenAIClient(customApiKey);
        if (!ai) {
            return {
                question: fallbackQuestion(params.type, params.skillOrTopic, params.companyName),
                topic: params.skillOrTopic || params.type,
                provider: 'mock',
            };
        }
        try {
            const prompt = `Generate 1 realistic, high-signal interview question for a software engineering student.
Mode/Type: ${params.type}
Topic/Skill: ${params.skillOrTopic || 'General CS'}
Target Company: ${params.companyName || 'Tech Company'}
Difficulty: ${params.difficulty || 'Medium'}

Output strictly valid JSON:
{
  "question": "<The question string>",
  "topic": "<Subtopic or skill evaluated>"
}`;
            const response = await ai.models.generateContent({
                model: getModelName(),
                contents: prompt,
                config: { responseMimeType: 'application/json' },
            });
            const parsed = JSON.parse(response.text || '{}');
            return {
                question: parsed.question || fallbackQuestion(params.type, params.skillOrTopic, params.companyName),
                topic: parsed.topic || params.skillOrTopic || params.type,
                provider: 'gemini',
            };
        }
        catch {
            return {
                question: fallbackQuestion(params.type, params.skillOrTopic, params.companyName),
                topic: params.skillOrTopic || params.type,
                provider: 'mock',
            };
        }
    },
    async analyzeResumeWithAi(params, customApiKey) {
        const ai = createGenAIClient(customApiKey);
        if (!ai) {
            return fallbackResumeAnalysis(params.resumeContent);
        }
        try {
            const prompt = `You are a Technical Recruiter and ATS Expert.
Target Role: ${params.targetRole || 'Software Engineer'}
Target Company: ${params.companyName || 'Tech Company'}

Resume Content:
"""
${params.resumeContent}
"""

Analyze the resume critically. Output strictly valid JSON:
{
  "atsScore": <number 0-100>,
  "jobMatchScore": <number 0-100>,
  "keywordScore": <number 0-100>,
  "strengths": ["<strength 1>", "<strength 2>", "<strength 3>"],
  "missingKeywords": ["<missing keyword 1>", "<missing keyword 2>"],
  "weakSections": ["<section with room for improvement>"],
  "suggestions": ["<suggestion 1>", "<suggestion 2>"]
}`;
            const response = await ai.models.generateContent({
                model: getModelName(),
                contents: prompt,
                config: { responseMimeType: 'application/json' },
            });
            const parsed = JSON.parse(response.text || '{}');
            return {
                atsScore: Number(parsed.atsScore) || 85,
                jobMatchScore: Number(parsed.jobMatchScore) || 80,
                keywordScore: Number(parsed.keywordScore) || 75,
                strengths: Array.isArray(parsed.strengths) ? parsed.strengths : ['Clear technical foundation'],
                missingKeywords: Array.isArray(parsed.missingKeywords) ? parsed.missingKeywords : ['Docker', 'System Design'],
                weakSections: Array.isArray(parsed.weakSections) ? parsed.weakSections : [],
                suggestions: Array.isArray(parsed.suggestions) ? parsed.suggestions : ['Add quantified impact to project descriptions.'],
                rule: 'Never invent experience or skills not demonstrated by the candidate.',
                provider: 'gemini',
            };
        }
        catch (err) {
            console.warn('Gemini resume analysis error:', err.message);
            return fallbackResumeAnalysis(params.resumeContent);
        }
    },
    async tailorResumeBullet(params, customApiKey) {
        const ai = createGenAIClient(customApiKey);
        if (!ai) {
            return fallbackResumeTailor(params.bulletText, params.action, params.targetCompany);
        }
        try {
            const actionPrompts = {
                improve: 'Enhance this resume bullet point using strong action verbs, clear technical context, and high engineering signal.',
                concise: 'Make this resume bullet point crisp, punchy, and concise without losing key technical achievements.',
                keywords: 'Incorporate high-value software engineering keywords (such as RESTful APIs, scalable architecture, CI/CD, or SQL) naturally.',
                quantify: 'Frame this bullet point to highlight measurable impact, performance optimization, latency reduction, or efficiency gains.',
                company: `Tailor this bullet point specifically for ${params.targetCompany || 'top tier product companies'}, emphasizing relevant scalability and clean craftsmanship.`,
            };
            const prompt = `You are an elite resume editor for software engineers.
Instruction: ${actionPrompts[params.action] || actionPrompts.improve}
Original Bullet Point: "${params.bulletText}"
Target Role: ${params.targetRole || 'Software Engineer'}
Target Company: ${params.targetCompany || 'Tech Company'}

Respond strictly with valid JSON:
{
  "rewrittenText": "<The improved single bullet point>",
  "explanation": "<1 brief sentence explaining the enhancement made>"
}`;
            const response = await ai.models.generateContent({
                model: getModelName(),
                contents: prompt,
                config: { responseMimeType: 'application/json' },
            });
            const parsed = JSON.parse(response.text || '{}');
            return {
                rewrittenText: parsed.rewrittenText || params.bulletText,
                action: params.action,
                explanation: parsed.explanation || `Optimized with ${params.action} mode.`,
                provider: 'gemini',
            };
        }
        catch (err) {
            console.warn('Gemini bullet tailoring error:', err.message);
            return fallbackResumeTailor(params.bulletText, params.action, params.targetCompany);
        }
    },
};
// --- Fallback Functions for Offline / Demo Mode ---
function fallbackMentorResponse(prompt, context) {
    const normalized = prompt.toLowerCase();
    if (normalized.includes('counsellor') || normalized.includes('counselor') || normalized.includes('referral')) {
        return 'I can request a confidential counsellor referral for you right away. A member of the student support team will follow up with the next steps. Your mental health and wellbeing always come first.';
    }
    if (normalized.includes('stress') || normalized.includes('overwhelm') || normalized.includes('tired') || normalized.includes('burnout')) {
        return 'I hear you, and it is completely normal to feel stressed during placement preparation. Take a deep breath, step away from the screen for 15 minutes, and focus on just ONE high-impact task today. Would you like me to simplify your daily mission or arrange a counsellor referral?';
    }
    if (normalized.includes('study') || normalized.includes('learn') || normalized.includes('today')) {
        return `Based on your profile, focus on **Trees & Operating Systems** today:\n\n1. Review Binary Search Tree (BST) insertion and traversals (30 min)\n2. Solve 2 medium LeetCode problems (e.g. *Validate BST*, *Level Order Traversal*)\n3. Brush up on process vs. thread concurrency concepts.`;
    }
    if (normalized.includes('google') || normalized.includes('chance') || normalized.includes('faang') || normalized.includes('hired')) {
        return `Your current readiness is **${context.readinessScore ?? 72}%**. Tier-1 companies like Google require mastery of Advanced Graphs, Dynamic Programming, and System Design. Focus on elevating your DSA from 70% to 90% and doing 2 mock interviews per week.`;
    }
    if (normalized.includes('company') || normalized.includes('target') || normalized.includes('match')) {
        return `Your top matched company is **${context.targetCompany || 'TechNova'}** (85% fit). Priority skills to close the remaining gap: **Operating Systems** and **Database Indexing**.`;
    }
    if (normalized.includes('resume') || normalized.includes('cv')) {
        return 'Your resume highlights strong Python and full-stack project experience. To boost your ATS score to 90+, quantify your project achievements (e.g. "% latency reduction", "number of active users") and add SQL / Docker evidence.';
    }
    return `I am your CareerOS AI coach. I can help you with personalized study roadmaps, company fit analysis, live mock interview critiques, resume bullet tailoring, and wellbeing calibration. What would you like to tackle next?`;
}
function fallbackInterviewEvaluation(question, answer) {
    const a = answer.toLowerCase();
    const keywords = ['because', 'trade-off', 'complexity', 'performance', 'database', 'tree', 'project', 'latency', 'architecture', 'scalability', 'memory'];
    const matched = keywords.filter((k) => a.includes(k)).length;
    const filler = (a.match(/\b(um|like|basically|sort of)\b/g) || []).length;
    const technical = Math.min(10, Math.round((5.5 + matched * 0.6) * 10) / 10);
    const communication = Math.min(10, Math.round((6.0 + Math.min(a.length / 140, 2) - filler * 0.3) * 10) / 10);
    const clarity = Math.min(10, Math.round((5.5 + (a.includes('first') || a.includes('for example') ? 1.5 : 0) + Math.min(a.length / 220, 1.5)) * 10) / 10);
    const structure = Math.min(10, Math.round((5.5 + (a.includes('trade') || a.includes('however') ? 1.5 : 0) + (a.includes('result') ? 1.0 : 0)) * 10) / 10);
    const score = Math.min(100, Math.round(((technical + communication + clarity + structure) / 4) * 10));
    return {
        score,
        technicalScore: technical,
        communicationScore: communication,
        clarityScore: clarity,
        structureScore: structure,
        feedback: `Good technical foundation. ${matched >= 2 ? 'Great use of architectural terms and reasoning.' : 'Try to explicitly discuss complexity and trade-offs.'} Structure your answer using the Situation-Task-Action-Result format.`,
        strengths: matched >= 2 ? ['Applied relevant technical reasoning', 'Good conceptual grasp of fundamentals'] : ['Direct and relevant response to the prompt'],
        improvements: ['Explicitly state space and time complexity trade-offs', 'Provide a concrete practical scenario to validate your reasoning'],
        idealAnswer: 'Start with a high-level definition, state the key mechanical differences (memory layout, execution context), discuss the performance/safety trade-offs, and conclude with when to choose each approach.',
        provider: 'mock',
    };
}
function fallbackQuestion(type, topic, company) {
    if (type === 'HR Interview') {
        return 'Tell me about a time you encountered a significant technical roadblock in a team project and how you resolved it.';
    }
    if (type === 'Project Defense') {
        return 'What was the most critical architectural trade-off in your project, and what would you design differently in hindsight?';
    }
    if (type === 'Core CS') {
        return 'Explain how virtual memory works and what happens under the hood during a page fault.';
    }
    if (type === 'Target Company') {
        return `Why are you interested in joining ${company || 'our company'}, and how do your technical skills align with our engineering stack?`;
    }
    if (type === 'Communication') {
        return 'Explain the difference between SQL and NoSQL databases to a non-technical product manager.';
    }
    return 'Explain the difference between a Binary Search Tree and a Balanced AVL Tree in terms of search, insertion, and rebalancing complexity.';
}
function fallbackResumeAnalysis(content) {
    const text = content.toLowerCase();
    const keywords = ['python', 'react', 'node', 'sql', 'rest', 'docker', 'git', 'data structures', 'system design', 'aws', 'ci/cd'];
    const found = keywords.filter((k) => text.includes(k));
    const missing = keywords.filter((k) => !text.includes(k));
    const keywordScore = Math.round((found.length / keywords.length) * 100);
    const atsScore = Math.min(95, Math.round(65 + keywordScore * 0.3));
    const jobMatchScore = Math.min(95, Math.round(60 + keywordScore * 0.35));
    return {
        atsScore,
        jobMatchScore,
        keywordScore,
        strengths: found.slice(0, 4),
        missingKeywords: missing.slice(0, 4),
        weakSections: missing.length > 4 ? ['Keywords & Cloud / DevOps tools'] : [],
        suggestions: missing.slice(0, 3).map((k) => `Include verified experience with ${k.toUpperCase()} if applicable.`),
        rule: 'Never invent skills or experience.',
        provider: 'mock',
    };
}
function fallbackResumeTailor(bullet, action, company) {
    const companyName = company || 'TechNova';
    switch (action) {
        case 'improve':
            return {
                rewrittenText: `Architected and deployed ${bullet.replace(/^(built|created|developed)/i, '').trim()}, boosting execution efficiency and system reliability.`,
                action,
                explanation: 'Replaced passive verbs with strong leadership verbs and highlighted reliability.',
                provider: 'mock',
            };
        case 'concise':
            return {
                rewrittenText: bullet.split(',')[0].replace(/platform.*$/i, 'platform with optimized latency.'),
                action,
                explanation: 'Removed filler phrases and focused on the core engineering deliverable.',
                provider: 'mock',
            };
        case 'keywords':
            return {
                rewrittenText: `${bullet} Leveraging RESTful APIs, SQL indexing, Docker containerization, and Git CI/CD pipelines.`,
                action,
                explanation: 'Integrated high-demand backend and DevOps keywords.',
                provider: 'mock',
            };
        case 'quantify':
            return {
                rewrittenText: `${bullet} Resulting in a 35% reduction in latency and supporting 1,000+ simulated active requests.`,
                action,
                explanation: 'Added measurable impact metrics and throughput scale.',
                provider: 'mock',
            };
        case 'company':
            return {
                rewrittenText: `${bullet} Aligned with ${companyName}'s engineering culture of high availability, modular code design, and scalable data processing.`,
                action,
                explanation: `Tailored phrasing to match ${companyName}'s engineering priorities.`,
                provider: 'mock',
            };
        default:
            return {
                rewrittenText: bullet,
                action,
                explanation: 'Standard formatting applied.',
                provider: 'mock',
            };
    }
}
