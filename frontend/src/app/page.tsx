"use client";

import React from "react";
import Link from "next/link";
import Logo from "../components/logo";
import { Button } from "../components/ui/button";
import type { Feature, Testimonial } from "./types";

const features: Feature[] = [
  {
    title: "Гибкое управление курсами",
    description:
      "Создавайте и управляйте курсами легко с интуитивно понятным интерфейсом.",
    icon: (
      <svg
        className="h-6 w-6 text-primary mr-3 flex-shrink-0 transition-transform duration-300 hover:scale-110"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path d="M12 20h9" />
        <path d="M12 4v16" />
        <path d="M3 12h9" />
      </svg>
    ),
  },
  {
    title: "Аналитика и отчеты",
    description:
      "Отслеживайте прогресс студентов и эффективность курсов с помощью подробных отчетов.",
    icon: (
      <svg
        className="h-6 w-6 text-primary mr-3 flex-shrink-0 transition-transform duration-300 hover:scale-110"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <circle cx="12" cy="12" r="10" />
        <path d="M12 6v6l4 2" />
      </svg>
    ),
  },
  {
    title: "Поддержка и сообщество",
    description:
      "Получайте помощь и обменивайтесь опытом с другими образовательными учреждениями.",
    icon: (
      <svg
        className="h-6 w-6 text-primary mr-3 flex-shrink-0 transition-transform duration-300 hover:scale-110"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path d="M17 20h5v-2a4 4 0 00-3-3.87" />
        <path d="M9 20H4v-2a4 4 0 013-3.87" />
        <circle cx="12" cy="7" r="4" />
      </svg>
    ),
  },
  {
    title: "Мобильное приложение",
    description:
      "Доступ к вашим курсам и материалам в любое время и в любом месте через наше мобильное приложение.",
    icon: (
      <svg
        className="h-6 w-6 text-primary mr-3 flex-shrink-0 transition-transform duration-300 hover:scale-110"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <rect x="7" y="2" width="10" height="20" rx="2" ry="2" />
        <line x1="12" y1="18" x2="12" y2="18" />
      </svg>
    ),
  },
  {
    title: "Интеграция с платежными системами",
    description:
      "Обеспечьте удобные и безопасные способы оплаты для ваших студентов с помощью интеграции с популярными платежными системами.",
    icon: (
      <svg
        className="h-6 w-6 text-primary mr-3 flex-shrink-0 transition-transform duration-300 hover:scale-110"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path d="M21 10h-6a2 2 0 00-2 2v6a2 2 0 002 2h6a2 2 0 002-2v-6a2 2 0 00-2-2z" />
        <path d="M7 10H3a2 2 0 00-2 2v6a2 2 0 002 2h4a2 2 0 002-2v-6a2 2 0 00-2-2z" />
      </svg>
    ),
  },
  {
    title: "Поддержка нескольких языков",
    description:
      "Расширьте свою аудиторию, предлагая курсы и материалы на нескольких языках.",
    icon: (
      <svg
        className="h-6 w-6 text-primary mr-3 flex-shrink-0 transition-transform duration-300 hover:scale-110"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path d="M12 2l9 21H3L12 2z" />
        <path d="M12 16v-4" />
        <path d="M12 12h4" />
      </svg>
    ),
  },
];

const testimonials: Testimonial[] = [
  {
    name: "Анна Иванова",
    feedback:
      "Платформа помогла мне открыть собственное онлайн-образовательное учреждение быстро и без проблем.",
    rating: 5,
    avatar: "https://i.pravatar.cc/64?u=anna",
  },
  {
    name: "Иван Петров",
    feedback:
      "Удобный интерфейс и мощные инструменты для управления курсами и студентами.",
    rating: 4,
    avatar: "https://i.pravatar.cc/64?u=ivan",
  },
  {
    name: "Елена Смирнова",
    feedback:
      "Отличная поддержка и множество возможностей для развития моего образовательного бизнеса.",
    rating: 5,
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
  },
];

function StarRating({ rating }: { rating: number }) {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    stars.push(
      <svg
        key={i}
        className={`h-5 w-5 ${i <= rating ? "text-yellow-400" : "text-gray-300 dark:text-gray-600"
          }`}
        fill="currentColor"
        viewBox="0 0 20 20"
        aria-hidden="true"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.974a1 1 0 00.95.69h4.18c.969 0 1.371 1.24.588 1.81l-3.39 2.462a1 1 0 00-.364 1.118l1.287 3.974c.3.922-.755 1.688-1.54 1.118l-3.39-2.462a1 1 0 00-1.175 0l-3.39 2.462c-.784.57-1.838-.196-1.539-1.118l1.287-3.974a1 1 0 00-.364-1.118L2.045 9.4c-.783-.57-.38-1.81.588-1.81h4.18a1 1 0 00.95-.69l1.286-3.974z" />
      </svg>
    );
  }
  return <div className="flex justify-center">{stars}</div>;
}

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-white dark:bg-gray-900">
      {/* Navigation Bar */}
      <nav className="flex items-center justify-between px-6 py-4 border-b border-gray-200 dark:border-gray-700">
        <Link href="/" className="flex items-center">
          <Logo size="48px" fontSize="24px" />
          <span className="ml-3 text-xl font-bold text-gray-900 dark:text-white">
            EduPlatform
          </span>
        </Link>
        <div className="flex items-center space-x-4">
          {/* Language Selector */}
          <label htmlFor="language-select" className="sr-only">
            Выберите язык
          </label>
          <select
            id="language-select"
            aria-label="Select language"
            className="rounded-md border border-gray-300 bg-white py-1 px-2 text-sm text-gray-700 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200"
            defaultValue="en"
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
              // Placeholder for language change handler
              console.log('Language changed to:', e.target.value);
            }}
          >
            <option value="en">English</option>
            <option value="de">Deutsch</option>
            <option value="zh">中文</option>
            <option value="ar">العربية</option>
            <option value="ja">日本語</option>
            <option value="he">עברית</option>
          </select>
          <Link href="/signup" passHref legacyBehavior>
            <Button
              asChild
              variant="default"
              size="sm"
              className="transition-colors duration-300 hover:bg-primary-foreground/90"
            >
              <a>Зарегистрироваться</a>
            </Button>
          </Link>
        </div>
      </nav>

      {/* Welcome Banner */}
      <section className="bg-primary text-primary-foreground py-6 text-center">
        <h2 className="text-2xl font-semibold">
          Добро пожаловать на EduPlatform — ваш путь к успешному онлайн-образованию!
        </h2>
      </section>

      {/* Hero Section */}
      <header className="flex flex-col items-center justify-center px-6 py-20 text-center">
        <h1 className="max-w-4xl text-5xl font-extrabold text-gray-900 dark:text-white leading-tight">
          Откройте свое онлайн-образовательное учреждение с нами
        </h1>
        <p className="mt-6 max-w-2xl text-lg text-gray-600 dark:text-gray-300">
          Полный набор инструментов для создания, управления и развития вашего
          образовательного бизнеса.
        </p>
        <Link href="/signup" passHref legacyBehavior>
          <Button
            asChild
            variant="default"
            size="lg"
            className="mt-10 transition-colors duration-300 hover:bg-primary-foreground/90"
          >
            <a>Начать бесплатно</a>
          </Button>
        </Link>
      </header>

      {/* Features Section */}
      <section className="bg-gray-50 dark:bg-gray-800 py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <h2 className="text-center text-3xl font-bold text-gray-900 dark:text-white">
            Почему выбирают нас
          </h2>
          <div className="mt-10 grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="rounded-lg bg-white p-6 shadow-md dark:bg-gray-900 transition-transform duration-300 hover:scale-105"
              >
                <div className="flex items-center mb-2">
                  {feature.icon}
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                    {feature.title}
                  </h3>
                </div>
                <p className="text-gray-600 dark:text-gray-300">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="bg-gray-50 dark:bg-gray-800 py-16">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
            Отзывы наших пользователей
          </h2>
          <div className="mt-10 space-y-8">
            {testimonials.map((testimonial) => (
              <blockquote
                key={testimonial.name}
                className="flex flex-col items-center rounded-lg bg-white p-6 shadow-md dark:bg-gray-900 sm:flex-row sm:items-start max-w-xl mx-auto"
              >
                <img
                  src={testimonial.avatar}
                  alt={testimonial.name}
                  className="h-16 w-16 rounded-full object-cover"
                />
                <div className="mt-4 sm:ml-6 sm:mt-0 sm:flex-1 text-left">
                  <StarRating rating={testimonial.rating} />
                  <p className="mt-4 text-lg italic text-gray-700 dark:text-gray-300">
                    “{testimonial.feedback}”
                  </p>
                  <footer className="mt-4 font-semibold text-gray-900 dark:text-white">
                    — {testimonial.name}
                  </footer>
                </div>
              </blockquote>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="bg-primary text-primary-foreground py-16 text-center">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="text-3xl font-bold">Готовы начать?</h2>
          <p className="mt-4 text-lg">
            Присоединяйтесь к тысячам успешных образовательных учреждений уже сегодня.
          </p>
          <div className="mt-8 flex justify-center space-x-4">
            <Link href="/signup" passHref legacyBehavior>
              <Button
                asChild
                variant="default"
                size="lg"
                className="bg-primary-foreground text-primary hover:bg-primary-foreground/90"
              >
                <a>Начать бесплатно</a>
              </Button>
            </Link>
            <Link href="/contact" passHref legacyBehavior>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-primary-foreground text-primary hover:bg-primary-foreground hover:text-primary"
              >
                <a>Связаться с нами</a>
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Artistic Roadmap Section */}
      <section className="bg-gray-50 dark:bg-gray-800 py-16">
        <div className="mx-auto max-w-7xl px-6">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white text-center mb-12">
            Дорожная карта развития
          </h2>
          <div className="relative flex flex-col items-center">
            {/* SVG curved path */}
            <svg
              className="absolute top-0 left-1/2 -translate-x-1/2 h-full w-1/2"
              viewBox="0 0 200 600"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                d="M100 0 C150 150, 50 300, 100 450 C150 600, 50 750, 100 900"
                stroke="hsl(var(--primary))"
                strokeWidth="6"
                fill="none"
                strokeLinecap="round"
              />
            </svg>

            {/* Steps */}
            <div className="space-y-24 z-10 max-w-7xl w-full">
              {/* Step 1 */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-start relative w-full sm:w-1/2 ml-0 sm:ml-24">
                <div className="flex-shrink-0 h-40 w-full sm:w-64 rounded-lg border-4 border-primary bg-primary-foreground/10 flex items-center justify-center text-primary text-xl font-semibold mb-4 sm:mb-0">
                  Изображение 1
                </div>
                <div className="relative sm:top-0 sm:ml-16 text-left">
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                    Запуск платформы
                  </h3>
                  <p className="mt-2 max-w-md text-gray-700 dark:text-gray-300">
                    Создание базовой функциональности для управления курсами и студентами.
                  </p>
                </div>
              </div>
              {/* Step 2 */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-end relative w-full sm:w-1/2 mr-0 sm:mr-24">
                <div className="flex-shrink-0 h-40 w-full sm:w-64 rounded-lg border-4 border-primary bg-primary-foreground/10 flex items-center justify-center text-primary text-xl font-semibold mb-4 sm:mb-0">
                  Изображение 2
                </div>
                <div className="relative sm:top-0 sm:mr-16 text-right">
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                    Мобильное приложение
                  </h3>
                  <p className="mt-2 max-w-md text-gray-700 dark:text-gray-300">
                    Разработка мобильного приложения для доступа к курсам на ходу.
                  </p>
                </div>
              </div>
              {/* Step 3 */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-start relative w-full sm:w-1/2 ml-0 sm:ml-24">
                <div className="flex-shrink-0 h-40 w-full sm:w-64 rounded-lg border-4 border-primary bg-primary-foreground/10 flex items-center justify-center text-primary text-xl font-semibold mb-4 sm:mb-0">
                  Изображение 3
                </div>
                <div className="relative sm:top-0 sm:ml-16 text-left">
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                    Интеграция платежных систем
                  </h3>
                  <p className="mt-2 max-w-md text-gray-700 dark:text-gray-300">
                    Обеспечьте удобные и безопасные способы оплаты для пользователей.
                  </p>
                </div>
              </div>
              {/* Step 4 */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-end relative w-full sm:w-1/2 mr-0 sm:mr-24">
                <div className="flex-shrink-0 h-40 w-full sm:w-64 rounded-lg border-4 border-primary bg-primary-foreground/10 flex items-center justify-center text-primary text-xl font-semibold mb-4 sm:mb-0">
                  Изображение 4
                </div>
                <div className="relative sm:top-0 sm:mr-16 text-right">
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                    Многоязычная поддержка
                  </h3>
                  <p className="mt-2 max-w-md text-gray-700 dark:text-gray-300">
                    Расширьте аудиторию за счет поддержки нескольких языков.
                  </p>
                </div>
              </div>
              {/* Step 5 */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-start relative w-full sm:w-1/2 ml-0 sm:ml-24">
                <div className="flex-shrink-0 h-40 w-full sm:w-64 rounded-lg border-4 border-primary bg-primary-foreground/10 flex items-center justify-center text-primary text-xl font-semibold mb-4 sm:mb-0">
                  Изображение 5
                </div>
                <div className="relative sm:top-0 sm:ml-16 text-left">
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                    Расширение функционала
                  </h3>
                  <p className="mt-2 max-w-md text-gray-700 dark:text-gray-300">
                    Добавление новых возможностей и улучшение пользовательского опыта.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer Section */}
      <footer className="w-full border-t border-gray-200 bg-gray-50 py-6 text-center text-sm text-gray-500 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400">
        &copy; {new Date().getFullYear()} EduPlatform. Все права защищены.
      </footer>
    </div>
  );
}