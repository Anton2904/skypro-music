import Image from 'next/image';
import Link from 'next/link';
import cn from 'classnames';
import styles from './AuthForm.module.css';

type AuthFormProps = {
  type: 'signin' | 'signup';
};

export function AuthForm({ type }: AuthFormProps) {
  const isSignin = type === 'signin';

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.modal}>
          <form className={styles.form}>
            <Link href="/" className={styles.logo}>
              <Image
                src="/img/logo_modal.png"
                alt="Skypro Music"
                width={140}
                height={21}
                priority
              />
            </Link>

            <input
              className={cn(styles.input, styles.login)}
              type="text"
              name="login"
              placeholder="Почта"
            />
            <input
              className={styles.input}
              type="password"
              name="password"
              placeholder="Пароль"
            />

            {!isSignin ? (
              <input
                className={styles.input}
                type="password"
                name="repeat-password"
                placeholder="Повторите пароль"
              />
            ) : null}

            <div className={styles.errorContainer} />

            {isSignin ? (
              <>
                <button type="submit" className={styles.primaryButton}>
                  Войти
                </button>
                <Link href="/signup" className={styles.secondaryButton}>
                  Зарегистрироваться
                </Link>
              </>
            ) : (
              <button type="submit" className={styles.primaryButton}>
                Зарегистрироваться
              </button>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}
