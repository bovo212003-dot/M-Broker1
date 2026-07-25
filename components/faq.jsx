"use client";

import { useState } from "react";
import { Plus, Minus } from "lucide-react";

export default function Faq({ items }) {
  const [mo, setMo] = useState(0);

  return (
    <div className="divide-y divide-steel-200 overflow-hidden rounded-card border border-steel-200 bg-white">
      {items.map((it, i) => {
        const dangMo = mo === i;
        return (
          <div key={it.hoi}>
            <h3>
              <button
                type="button"
                onClick={() => setMo(dangMo ? -1 : i)}
                className="flex w-full items-start justify-between gap-4 px-5 py-4 text-left"
                aria-expanded={dangMo}
              >
                <span className="text-[15px] font-semibold leading-snug text-steel">{it.hoi}</span>
                <span className="mt-0.5 flex-none text-steel-400" aria-hidden="true">
                  {dangMo ? <Minus size={17} /> : <Plus size={17} />}
                </span>
              </button>
            </h3>
            {dangMo && (
              <div className="animate-fade-up px-5 pb-5 pr-12">
                <p className="text-sm leading-relaxed text-steel-500">{it.dap}</p>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
