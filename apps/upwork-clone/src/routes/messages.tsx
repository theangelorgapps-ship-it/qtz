import { createFileRoute } from '@tanstack/react-router'
import { useMemo, useRef, useState } from 'react'
import type { FormEvent } from 'react'
import { AppShell, SearchIcon, SendIcon } from '~/components/app/AppShell'
import { Avatar } from '~/components/app/Avatar'
import { MESSAGE_ROOMS, findRoom } from '~/lib/data'
import type { MessageRoom } from '~/lib/data'

export const Route = createFileRoute('/messages')({
  component: MessagesPage,
})

interface ChatMessage {
  from: 'me' | 'them' | 'system'
  text: string
  time: string
}

function MessageBubble({ message, previous }: { message: ChatMessage; previous?: ChatMessage }) {
  const showTime = !previous || previous.time !== message.time
  if (message.from === 'system') {
    return (
      <div className="px-4 py-1.5 text-center">
        <p className="mx-auto max-w-md text-xs italic text-[#5e6d55]">{message.text}</p>
        {showTime && <p className="mt-1 text-[11px] text-[#9aaa97]">{message.time}</p>}
      </div>
    )
  }
  const mine = message.from === 'me'
  return (
    <div className={`flex flex-col px-4 py-1 ${mine ? 'items-end' : 'items-start'}`}>
      {showTime && (
        <p className="w-full pb-1 pt-2 text-center text-[11px] text-[#9aaa97]">{message.time}</p>
      )}
      <div
        className={`max-w-[70%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
          mine
            ? 'rounded-br-md bg-[#e8f6e6] text-[#181818]'
            : 'rounded-bl-md bg-[#f2f7f2] text-[#181818]'
        }`}
      >
        {message.text}
      </div>
    </div>
  )
}

function MessagesPage() {
  const [selectedId, setSelectedId] = useState<string>(MESSAGE_ROOMS[0]?.id ?? '')
  const [query, setQuery] = useState('')
  const [draft, setDraft] = useState('')
  const [sentByRoom, setSentByRoom] = useState<Record<string, ChatMessage[]>>({})
  const threadRef = useRef<HTMLDivElement>(null)

  const filteredRooms = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return MESSAGE_ROOMS
    return MESSAGE_ROOMS.filter(
      (r) =>
        r.title.toLowerCase().includes(q) ||
        r.counterpart.toLowerCase().includes(q) ||
        r.preview.toLowerCase().includes(q),
    )
  }, [query])

  const room: MessageRoom | undefined = findRoom(selectedId) ?? filteredRooms[0] ?? MESSAGE_ROOMS[0]
  const thread: ChatMessage[] = room ? [...room.messages, ...(sentByRoom[room.id] ?? [])] : []

  const send = (e: FormEvent) => {
    e.preventDefault()
    const text = draft.trim()
    if (!text || !room) return
    const now = new Date()
    const time = now.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    })
    setSentByRoom((prev) => ({
      ...prev,
      [room.id]: [...(prev[room.id] ?? []), { from: 'me', text, time }],
    }))
    setDraft('')
    requestAnimationFrame(() => {
      threadRef.current?.scrollTo({ top: threadRef.current.scrollHeight })
    })
  }

  return (
    <AppShell title="Messages" fillHeight>
      <div className="flex min-h-0 flex-1 overflow-hidden rounded-xl border border-[#d5e0d5] bg-white">
        {/* Left pane: room list */}
        <aside className="flex w-[360px] shrink-0 flex-col border-r border-[#d5e0d5]">
          <div className="border-b border-[#e4ebe4] p-3">
            <label className="flex items-center gap-2 rounded-full border border-[#d5e0d5] bg-[#f7faf7] px-3.5 py-2">
              <SearchIcon className="h-4 w-4 text-[#5e6d55]" />
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search messages"
                className="w-full bg-transparent text-sm text-[#181818] outline-none placeholder:text-[#9aaa97]"
              />
            </label>
          </div>
          <ul className="min-h-0 flex-1 overflow-y-auto">
            {filteredRooms.length === 0 && (
              <li className="px-5 py-8 text-center text-sm text-[#5e6d55]">
                No conversations match your search.
              </li>
            )}
            {filteredRooms.map((r) => {
              const active = room?.id === r.id
              return (
                <li key={r.id}>
                  <button
                    type="button"
                    onClick={() => setSelectedId(r.id)}
                    className={`flex w-full items-start gap-3 px-4 py-3.5 text-left transition-colors ${
                      active ? 'bg-[#e8f6e6]' : 'hover:bg-[#f7faf7]'
                    }`}
                  >
                    <Avatar name={r.counterpart} size={44} />
                    <div className="min-w-0 flex-1">
                      <div className="flex items-start justify-between gap-2">
                        <p
                          className={`line-clamp-2 flex-1 text-sm leading-snug ${
                            r.unread ? 'font-bold text-[#181818]' : 'font-semibold text-[#181818]'
                          }`}
                        >
                          {r.title}
                        </p>
                        <span className="shrink-0 pt-0.5 text-xs text-[#5e6d55]">{r.date}</span>
                      </div>
                      <div className="mt-0.5 flex items-center gap-2">
                        {r.unread && <span className="h-2 w-2 shrink-0 rounded-full bg-[#14a800]" />}
                        <p
                          className={`truncate text-sm ${
                            r.unread ? 'font-semibold text-[#181818]' : 'text-[#5e6d55]'
                          }`}
                        >
                          {r.preview}
                        </p>
                      </div>
                    </div>
                  </button>
                </li>
              )
            })}
          </ul>
        </aside>

        {/* Right pane: thread */}
        <section className="flex min-w-0 flex-1 flex-col">
          {room ? (
            <>
              <header className="flex items-center gap-3 border-b border-[#e4ebe4] px-5 py-3.5">
                <Avatar name={room.counterpart} size={36} />
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold text-[#181818]">{room.counterpart}</p>
                  <p className="truncate text-xs text-[#5e6d55]">{room.title}</p>
                </div>
              </header>
              <div ref={threadRef} className="min-h-0 flex-1 overflow-y-auto py-3">
                {thread.map((m, i) => (
                  <MessageBubble key={`${m.time}-${i}`} message={m} previous={thread[i - 1]} />
                ))}
              </div>
              <form onSubmit={send} className="flex items-center gap-3 border-t border-[#e4ebe4] p-4">
                <input
                  type="text"
                  value={draft}
                  onChange={(e) => setDraft(e.target.value)}
                  placeholder="Type a message here…"
                  aria-label={`Message ${room.counterpart}`}
                  className="flex-1 rounded-full border border-[#d5e0d5] bg-white px-4 py-2.5 text-sm text-[#181818] outline-none transition-colors placeholder:text-[#9aaa97] focus:border-[#14a800]"
                />
                <button
                  type="submit"
                  aria-label="Send message"
                  disabled={!draft.trim()}
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#108a00] text-white transition-colors hover:bg-[#0b6100] disabled:cursor-not-allowed disabled:bg-[#beccbe]"
                >
                  <SendIcon className="h-5 w-5" />
                </button>
              </form>
            </>
          ) : (
            <div className="flex flex-1 items-center justify-center p-8 text-sm text-[#5e6d55]">
              Select a conversation to start messaging.
            </div>
          )}
        </section>
      </div>
    </AppShell>
  )
}
