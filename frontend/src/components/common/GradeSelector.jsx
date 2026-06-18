import { GRADE_OPTIONS } from "../../utils/constants";

export function GradeSelector({ value, onChange }) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-medium">Class</span>
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="w-full rounded-2xl border border-white/10 bg-white/6 px-4 py-3 text-sm outline-none transition focus:border-[var(--accent)]"
      >
        {GRADE_OPTIONS.map((option) => (
          <option key={option} value={option}>
            Class {option}
          </option>
        ))}
      </select>
    </label>
  );
}
