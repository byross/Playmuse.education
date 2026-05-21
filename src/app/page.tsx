import Image from "next/image";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <Image
          className={styles.logo}
          src="/playmuse_logo.png"
          alt="PlayMuse Education"
          width={817}
          height={578}
          priority
        />
      </main>
      <footer className={styles.footer}>
        <p>Copyright PlayMuse Education</p>
      </footer>
    </div>
  );
}
