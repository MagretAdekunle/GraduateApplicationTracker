// Navbar component goes here
import Link from "next/link";
export default function Navbar() {
    return (
        <nav className="bg-blue-600 text-white px-6 py-3 flex space-x-6">
        <Link href="/dashboard" className="hover:underline">Dashboard</Link>
        <Link href="/profile" className="hover:underline">Profile</Link>
        <Link href="/match" className="hover:underline">Program Match</Link>
        <Link href="/sop" className="hover:underline">SOP Helper</Link>
        <Link href="/deadlines" className="hover:underline">Deadline Tracker</Link>
        </nav>
    );
}