'use client';

import { useState, type FormEvent } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import cn from 'classnames';
import { getTokens, loginUser, signupUser } from '@/lib/api/musicApi';
import styles from './AuthForm.module.css';

type AuthFormProps = {
  type: 'signin' | 'signup';
};

export function AuthForm({ type }: AuthFormProps) {
  const router = useRouter();
  const isSignin = type === 'signin';
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError('');

    if (!email.trim() || !password.trim()) {
      setError('Заполните почту и пароль');
      return;
    }

    if (!isSignin && password !== repeatPassword) {
      setError('Пароли не совпадают');
      return;
    }

    setIsLoading(true);

    try {
      if (isSignin) {
        const user = await loginUser({ email, password });
        const tokens = await getTokens({ email, password });

        localStorage.setItem('skyproUser', JSON.stringify(user));
        localStorage.setItem('skyproAccessToken', tokens.access);
        localStorage.setItem('skyproRefreshToken', tokens.refresh);
        window.dispatchEvent(new Event('skypro-auth-change'));

        router.push('/');
        router.refresh();
        return;
      }

      await signupUser({ email, password, username: email });
      router.push('/signin');
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : 'Произошла ошибка');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.modal}>
          <form className={styles.form} onSubmit={handleSubmit}>
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
              type="email"
              name="email"
              placeholder="Почта"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              disabled={isLoading}
            />
            <input
              className={styles.input}
              type="password"
              name="password"
              placeholder="Пароль"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              disabled={isLoading}
            />

            {!isSignin ? (
              <input
                className={styles.input}
                type="password"
                name="repeat-password"
                placeholder="Повторите пароль"
                value={repeatPassword}
                onChange={(event) => setRepeatPassword(event.target.value)}
                disabled={isLoading}
              />
            ) : null}

            <div className={styles.errorContainer}>{error ? <p className={styles.error}>{error}</p> : null}</div>

            {isSignin ? (
              <>
                <button type="submit" className={styles.primaryButton} disabled={isLoading}>
                  {isLoading ? 'Входим...' : 'Войти'}
                </button>
                <Link href="/signup" className={styles.secondaryButton}>
                  Зарегистрироваться
                </Link>
              </>
            ) : (
              <button type="submit" className={styles.primaryButton} disabled={isLoading}>
                {isLoading ? 'Регистрируем...' : 'Зарегистрироваться'}
              </button>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}
