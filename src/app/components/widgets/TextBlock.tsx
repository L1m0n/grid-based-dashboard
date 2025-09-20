import { TextBlockWidget } from "@/types";
import styles from "./styles.module.css";
interface TextBlockProps {
  widget: TextBlockWidget;
}

export default function TextBlock({ widget }: TextBlockProps) {
  return (
    <div className={styles.container}>
      <h4 className={styles.title}>{widget.data.title}</h4>
      <p className={styles.description}>{widget.data.content}</p>
    </div>
  );
}
