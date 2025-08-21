// SOP Helper page code
import { useState } from "react";

export default function SOPHelper() {
    const [sopText, setSopText] = useState("");
    const [feedback, setFeedback] = useState("");

    const handleChange = (e) => setSopText(e.target.value);

    const handleAnalyze = () => {
        let score = 0;
        let comments = [];
        if (sopText.length > 500) { score += 2; comments.push("Good length."); }
        if (/research|ai|machine learning|data/i.test(sopText)) { score += 2; comments.push("Strong research focus."); }
        if (/motivation|career|future/i.test(sopText)) { score += 1; comments.push("Clear motivation."); }
        if (/grammar|spelling/i.test(sopText)) { comments.push("Check for grammar issues."); }
        setFeedback(`Score: ${score}/5\nComments: ${comments.join(' ')}`);
    };

    return (
        <div className="p-6 max-w-2xl mx-auto">
            <h1 className="text-2xl font-bold mb-4">SOP Helper</h1>
            <p className="mb-4 text-gray-600">Paste your Statement of Purpose below for quick feedback.</p>
            <textarea value={sopText} onChange={handleChange} className="w-full border p-2 rounded h-48" placeholder="Paste your SOP here..." />
            <button onClick={handleAnalyze} className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Analyze SOP</button>
            {feedback && (<div className="mt-4 p-4 border rounded bg-gray-50 whitespace-pre-wrap">{feedback}</div>)}
        </div>
    );
}
