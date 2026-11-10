export function SkillChip({ label }: { label: string }) {
  return (
    <span className="inline-flex items-center rounded-full bg-[#f2f7f2] px-3 py-1.5 text-[13px] font-medium text-[#001e00]">
      {label}
    </span>
  )
}

export function SkillChips({ skills, max }: { skills: string[]; max?: number }) {
  const shown = max !== undefined ? skills.slice(0, max) : skills
  const overflow = max !== undefined ? skills.length - shown.length : 0
  return (
    <div className="flex flex-wrap gap-2">
      {shown.map((s) => (
        <SkillChip key={s} label={s} />
      ))}
      {overflow > 0 ? (
        <span className="inline-flex items-center rounded-full bg-[#f2f7f2] px-3 py-1.5 text-[13px] font-semibold text-[#001e00]">
          +{overflow}
        </span>
      ) : null}
    </div>
  )
}
