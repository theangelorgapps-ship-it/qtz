"use client";

import { CheckCircleIcon, GavelIcon, ShieldCheckIcon, XIcon } from "@phosphor-icons/react";
import { FormEvent, useState } from "react";

export function BidDialog({ currentBid, title }: { currentBid: number; title: string }) {
  const [open, setOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const minimumBid = currentBid + 5;

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
  }

  function close() {
    setOpen(false);
    window.setTimeout(() => setSubmitted(false), 180);
  }

  return (
    <>
      <button className="button buttonWide" type="button" onClick={() => setOpen(true)}>
        <GavelIcon size={18} weight="bold" /> Place a bid
      </button>
      {open && (
        <div className="dialogBackdrop" role="presentation" onMouseDown={(event) => event.target === event.currentTarget && close()}>
          <section className="dialogPanel" role="dialog" aria-modal="true" aria-labelledby="bid-dialog-title">
            <button className="dialogClose iconButton" type="button" onClick={close} aria-label="Close bid form">
              <XIcon size={19} weight="bold" />
            </button>
            {submitted ? (
              <div className="successState" aria-live="polite">
                <span className="successIcon">
                  <CheckCircleIcon size={34} weight="fill" />
                </span>
                <span className="eyebrow">Bid submitted</span>
                <h2 id="bid-dialog-title">You are in the running</h2>
                <p>
                  The Business can now review your bid. You can edit or withdraw it until the opportunity closes.
                </p>
                <button className="button buttonWide" type="button" onClick={close}>
                  View my bids
                </button>
              </div>
            ) : (
              <form onSubmit={submit}>
                <span className="eyebrow">Submit your terms</span>
                <h2 id="bid-dialog-title">Bid for {title}</h2>
                <p className="dialogIntro">The Business can accept the highest bid or choose the Customer whose booking fits best.</p>
                <label className="fieldLabel" htmlFor="bid-amount">
                  Your bid
                </label>
                <div className="moneyField">
                  <span>£</span>
                  <input id="bid-amount" name="amount" type="number" min={minimumBid} defaultValue={minimumBid} required />
                </div>
                <p className="fieldHint">Current top bid is £{currentBid}. Minimum next bid is £{minimumBid}.</p>
                <label className="fieldLabel" htmlFor="bid-note">
                  Tell the Business what you need
                </label>
                <textarea
                  id="bid-note"
                  name="note"
                  rows={5}
                  placeholder="Share the address, preferred timing, access details and any special requirements."
                  required
                />
                <label className="checkRow">
                  <input type="checkbox" name="protection" />
                  <span>
                    <strong>Use Quaotz Protection</strong>
                    <small>
                      <ShieldCheckIcon size={16} weight="fill" /> Add a seven-day review window for 3% at checkout.
                    </small>
                  </span>
                </label>
                <div className="dialogSummary">
                  <span>Due if accepted</span>
                  <strong>Your final bid</strong>
                </div>
                <button className="button buttonWide" type="submit">
                  Review and submit bid
                </button>
              </form>
            )}
          </section>
        </div>
      )}
    </>
  );
}
