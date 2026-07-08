"use client";

export type CardStatus = "avail" | "warn" | "sold" | "closed";

export interface MemberCardViewModel {
	id: string;
	memberName: string;
	metaHtml: string;
	photoUrl: string;
	purchaseLink: string;
	status: CardStatus;
	badgeLabel: string | null;
	badgeClassName: string;
	buttonLabel: string;
	progressPercent: number;
	soldCount: number;
	progressColor: string;
	clickable: boolean;
}

interface MemberCardProps {
	card: MemberCardViewModel;
}

const statusClasses: Record<CardStatus, string> = {
	avail: "member-card member-card-avail",
	warn: "member-card member-card-warn",
	sold: "member-card member-card-sold",
	closed: "member-card member-card-closed",
};

export function MemberCard({ card }: MemberCardProps) {
	const content = (
		<>
			{card.badgeLabel ? (
				<div className={`member-card-badge ${card.badgeClassName}`}>{card.badgeLabel}</div>
			) : null}
			<div
				className="member-card-meta"
				dangerouslySetInnerHTML={{ __html: card.metaHtml }}
				title={card.metaHtml.replace(/<br\s*\/?>/gi, " ").replace(/&nbsp;/g, " ")}
			/>
			<div className="member-card-photo-wrap">
				{/* eslint-disable-next-line @next/next/no-img-element */}
				<img
					alt={`${card.memberName} JKT48 photo`}
					className="member-card-photo"
					height={74}
					loading="lazy"
					src={card.photoUrl}
					width={74}
				/>
			</div>
			<div className="member-card-name">{card.memberName}</div>
			<div className="mt-auto w-full">
				<div className="member-card-stats">
					<span>
						Sold:&nbsp;<b>{card.soldCount}</b>
					</span>
				</div>
				<div
					aria-label={card.buttonLabel.replace(/&nbsp;/g, " ")}
					className="member-card-progress"
					role="img"
				>
					<div
						className="member-card-progress-fill"
						style={{
							backgroundColor: card.progressColor,
							width: `${card.progressPercent}%`,
						}}
					/>
					<div
						className="member-card-progress-text"
						dangerouslySetInnerHTML={{ __html: card.buttonLabel }}
					/>
				</div>
			</div>
		</>
	);

	if (!card.clickable) {
		return <article className={statusClasses[card.status]}>{content}</article>;
	}

	return (
		<article className={statusClasses[card.status]}>
			<a
				className="flex h-full w-full flex-col items-center text-inherit no-underline"
				href={card.purchaseLink}
				rel="noreferrer"
				target="_blank"
			>
				{content}
			</a>
		</article>
	);
}
