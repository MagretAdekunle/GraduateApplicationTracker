// Match page code
import { useState } from "react";
import axios from "axios";

export default function MatchPage() {
    const [profile, setProfile] = useState({ interests: "", gpa: "", funding_needed: false });
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setProfile({ ...profile, [name]: type === "checkbox" ? checked : value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await axios.post("http://localhost:8000/match", { interests: profile.interests, gpa: parseFloat(profile.gpa), funding_needed: profile.funding_needed });
            setResults(res.data);
        } catch (err) { console.error(err); }
        setLoading(false);
    };

    return (
        <div className="p-6 max-w-2xl mx-auto">
            <h1 className="text-2xl font-bold mb-4">Program Matcher</h1>
            <form onSubmit={handleSubmit} className="space-y-4 bg-white p-4 rounded shadow">
                <div>
                    <label className="block font-medium">Research Interests (comma-separated)</label>
                    <input type="text" name="interests" value={profile.interests} onChange={handleChange} className="w-full border p-2 rounded" placeholder="AI, Machine Learning" />
                </div>
                <div>
                    <label className="block font-medium">GPA</label>
                    <input type="number" step="0.01" name="gpa" value={profile.gpa} onChange={handleChange} className="w-full border p-2 rounded" placeholder="3.7" />
                </div>
                <div className="flex items-center space-x-2">
                    <input type="checkbox" name="funding_needed" checked={profile.funding_needed} onChange={handleChange} />
                    <label className="font-medium">Require Funding</label>
                </div>
                <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">{loading ? "Matching..." : "Find Programs"}</button>
            </form>

            {results.length > 0 && (
                <div className="mt-6">
                    <h2 className="text-xl font-semibold mb-2">Matched Programs</h2>
                    <ul className="space-y-3">
                        {results.map((p) => (
                            <li key={p.id} className="border p-3 rounded bg-gray-50">
                                <h3 className="font-bold">{p.name} – {p.university}</h3>
                                <p className="text-sm">{p.location}</p>
                                <p className="text-sm">Deadline: {p.deadline}</p>
                                <p className="text-sm">Keywords: {p.keywords}</p>
                                <p className="text-sm">Funding: {p.funding}</p>
                                <p className="text-sm font-medium">Match Score: {p.score}</p>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}
