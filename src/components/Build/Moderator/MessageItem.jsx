import styles from './ChatBox.module.css';

export const MessageItem = ({ owner, sender, senderAvatar, message }) => {
    let messagePosition = (owner === sender) ? styles.chatApp__convMessageItemRight : styles.chatApp__convMessageItemLeft;

	return (
		<div className={`${styles.chatApp__convMessageItem} ${messagePosition} ${styles.clearfix}`}>
			<img src={senderAvatar} alt={sender} className={styles.chatApp__convMessageAvatar} />
			<div className={styles.chatApp__convMessageValue} dangerouslySetInnerHTML={{ __html: message }}></div>
		</div>
	);
};  