import React, { createContext, useMemo, useState } from "react";

export const DataContext = createContext(null);

export function DataProvider({ children }) {
  const [analytics, setAnalytics] = useState({
    totalApplicants: 0,
    totalVisitors: 0,
    courseVisits: {
      c_cpp: 0,
      embedded: 0,
    },
  });

  const [courses, setCourses] = useState([
    {
      id: "c_cpp",
      title: "C / C++ Fundamentals",
      description: "Build a solid foundation in low-level programming and algorithms.",
      duration: "8 weeks",
      instructor: "Vahe Sahakyan",
    },
    {
      id: "embedded",
      title: "Embedded Systems",
      description: "Program microcontrollers and develop real-world IoT projects.",
      duration: "10 weeks",
      instructor: "Vahe Sahakyan",
    },
  ]);

  const [articles, setArticles] = useState([
    {
      id: "1",
      title: "Getting Started with C/C++",
      content:
        "Your first steps into systems programming. In this article, we explore compilers, the toolchain, and basic syntax to get you productive quickly.",
      date: "2025-01-15",
      author: "Evolon Team",
      excerpt: "Your first steps into systems programming.",
    },
    {
      id: "2",
      title: "Demystifying Microcontrollers",
      content:
        "From pins to peripherals, what you need to know to build reliable embedded systems. We cover GPIO, timers, UART, and SPI at a high level.",
      date: "2025-02-05",
      author: "Evolon Team",
      excerpt: "From pins to peripherals, what you need to know.",
    },
    {
      id: "3",
      title: "Memory Management Essentials",
      content:
        "Pointers, stacks, heaps—and how to avoid pitfalls. Understand allocation strategies and common bugs to write safer, faster code.",
      date: "2025-03-10",
      author: "Evolon Team",
      excerpt: "Pointers, stacks, heaps—and how to avoid pitfalls.",
    },
  ]);

  const value = useMemo(
    () => ({
      analytics,
      setAnalytics,
      courses,
      setCourses,
      articles,
      setArticles,
    }),
    [analytics, courses, articles]
  );

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
}


