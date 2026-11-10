import { CheckIcon } from '~/components/icons'

/* Key Features comparison: Basic vs Business Plus. */

type Cell = { type: 'check' } | { type: 'dash' } | { type: 'text'; value: string }

interface Row {
  feature: string
  basic: Cell
  plus: Cell
}

const rows: Row[] = [
  { feature: 'Service fee', basic: { type: 'text', value: '7.99%' }, plus: { type: 'text', value: '10%' } },
  { feature: 'Marketplace access', basic: { type: 'check' }, plus: { type: 'check' } },
  { feature: 'Talent profiles', basic: { type: 'check' }, plus: { type: 'check' } },
  { feature: 'Hiring tools', basic: { type: 'check' }, plus: { type: 'check' } },
  { feature: 'Project workspace', basic: { type: 'check' }, plus: { type: 'check' } },
  { feature: 'Protected payments', basic: { type: 'check' }, plus: { type: 'check' } },
  { feature: 'Curated shortlists', basic: { type: 'dash' }, plus: { type: 'check' } },
  { feature: 'Expert-Vetted talent', basic: { type: 'dash' }, plus: { type: 'check' } },
  { feature: 'AI-powered hiring', basic: { type: 'dash' }, plus: { type: 'check' } },
  { feature: 'Centralized billing', basic: { type: 'dash' }, plus: { type: 'check' } },
  { feature: '30-day payment terms (US only)', basic: { type: 'dash' }, plus: { type: 'check' } },
]

function CellValue({ cell }: { cell: Cell }) {
  if (cell.type === 'check') {
    return <CheckIcon className="mx-auto h-5 w-5" />
  }
  if (cell.type === 'dash') {
    return (
      <span aria-label="Not included" className="text-lg text-[#beccbe]">
        —
      </span>
    )
  }
  return <span className="text-[15px] font-semibold text-[#1f1f1f]">{cell.value}</span>
}

export function FeatureComparison() {
  return (
    <section className="border-t border-[#e4ebe4] bg-[#f7faf7]">
      <div className="mx-auto max-w-[1100px] px-6 py-14 lg:px-10">
        <h2 className="text-center text-3xl font-medium tracking-[-0.03em] text-[#001e00] sm:text-4xl">
          Key Features
        </h2>
        <div className="mt-10 overflow-x-auto rounded-2xl border border-[#e4ebe4] bg-white">
          <table className="w-full min-w-[560px] border-collapse text-left">
            <thead>
              <tr className="border-b border-[#e4ebe4]">
                <th scope="col" className="px-6 py-4 text-[15px] font-semibold text-[#1f1f1f]">
                  Feature
                </th>
                <th scope="col" className="px-6 py-4 text-center text-[15px] font-semibold text-[#1f1f1f]">
                  Basic
                </th>
                <th scope="col" className="px-6 py-4 text-center text-[15px] font-semibold text-[#108a00]">
                  Business Plus
                </th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.feature} className="border-b border-[#e4ebe4] last:border-0">
                  <th scope="row" className="px-6 py-3.5 text-[15px] font-normal text-[#4d4d4d]">
                    {row.feature}
                  </th>
                  <td className="px-6 py-3.5 text-center">
                    <CellValue cell={row.basic} />
                  </td>
                  <td className="px-6 py-3.5 text-center">
                    <CellValue cell={row.plus} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  )
}
