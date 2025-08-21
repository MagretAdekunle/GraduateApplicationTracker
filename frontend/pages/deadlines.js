// Deadlines page code
import { useEffect, useState } from "react";
import axios from "axios";

export default function DeadlinesPage() {
    const [programs, setPrograms] = useState([]);
    const [reminders, setReminders] = useState({});

    useEffect(() => { const saved = localStorage.getItem("reminders"); if (saved) setReminders(JSON.parse(saved)); }, []);
    useEffect(() => { async function fetchPrograms() { try { const res = await axios.get("http://localhost:8000/programs"); setPrograms(res.data); } catch (err) { console.error(err); } } fetchPrograms(); }, []);

    const handleReminderChange = (id, date) => { setReminders({ ...reminders, [id]: date }); localStorage.setItem("reminders", JSON.stringify({ ...reminders, [id]: date })); };

    return (
        <div className="p-6 max-w-3xl mx-auto">
            <h1 className="text-2xl font-bold mb-4">Deadline Tracker</h1>
            <p className="mb-6 text-gray-600">Track graduate program deadlines and set personal reminders.</p>
            <ul className="space-y-4">
                {programs.map((p) => (
                    <li key={p.id} className="border p-4 rounded bg-gray-50">
                        <h2 className="font-bold">{p.name} – {p.university}</h2>
                        <p className="text-sm">Location: {p.location}</p>
                        <p className="text-sm">Application Deadline: {p.deadline}</p>
                        <div className="mt-2">
                            <label className="block font-medium">Set Reminder</label>
                            <input type="date" value={reminders[p.id] || ""} onChange={(e) => handleReminderChange(p.id, e.target.value)} className="border p-2 rounded" />
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}
