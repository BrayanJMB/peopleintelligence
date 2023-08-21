import React from 'react'
import { MessageItem } from './MessageItem';
import styles from "./ChatBox.module.css";

export const MessageList = ({ owner, messages }) => {
	return (
		<div className={styles.chatApp__convTimeline}>
			{messages.slice(0).reverse().map(messageItem => (
				<MessageItem
					key={messageItem.id}
					owner={owner}
					sender={messageItem.sender}
					senderAvatar={messageItem.senderAvatar}
					message={messageItem.message}
				/>
			))}
		</div>
	);
};
