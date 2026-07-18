import { CheckCircleIcon, UserCircleIcon } from "@phosphor-icons/react/dist/ssr";

export default function ProfilePage() {
  return <div className="appShell narrowShell"><section className="profilePageCard"><span className="profilePageAvatar"><UserCircleIcon size={48} weight="duotone" /></span><span className="eyebrow">Customer account</span><h1>Charles Finney</h1><p>Manchester · Booking contact</p><div className="profileChecklist"><span><CheckCircleIcon size={19} weight="fill" /> Identity verified</span><span><CheckCircleIcon size={19} weight="fill" /> Payment method ready</span><span><CheckCircleIcon size={19} weight="fill" /> Contact details ready</span></div><button className="button" type="button">Edit account</button></section></div>;
}
