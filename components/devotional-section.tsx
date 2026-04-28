"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { BookOpen, ArrowRight } from "lucide-react";
import { format } from "date-fns";
import { getDevotionalByDate, type Devotional } from "@/lib/devotional";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export function DevotionalSection() {
  const [todayDevo, setTodayDevo] = useState<Devotional | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const today = format(new Date(), "yyyy-MM-dd");
    getDevotionalByDate(today).then((data) => {
      setTodayDevo(data);
      setLoading(false);
    });
  }, []);

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="flex items-center gap-2 text-purple-600 font-bold uppercase tracking-widest text-sm">
              <BookOpen size={20} />
              <span>Daily Bread</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
              Start Your Day with Spiritual Nourishment
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              Our daily devotional provides biblical wisdom, prayerful insights,
              and practical steps to help you grow in your faith and navigate
              life's challenges with Godly purpose.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link href="/devotional">
                <Button className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-6 h-auto text-lg font-semibold rounded-xl w-full sm:w-auto">
                  Read Today's Devotional
                </Button>
              </Link>
              <Link href="/devotional">
                <Button
                  variant="ghost"
                  className="text-purple-600 hover:text-purple-700 hover:bg-purple-50 px-8 py-6 h-auto text-lg font-semibold rounded-xl w-full sm:w-auto"
                >
                  View Archive <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
            </div>
          </div>

          <div className="relative">
            {/* Decorative blobs */}
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-purple-100 rounded-full mix-blend-multiply filter blur-2xl opacity-70 animate-pulse"></div>
            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-blue-100 rounded-full mix-blend-multiply filter blur-2xl opacity-70 animate-pulse delay-1000"></div>

            <Card className="relative overflow-hidden border-0 shadow-2xl rounded-3xl transition-transform hover:scale-[1.02] duration-300">
              <div className="bg-purple-600 p-8 text-white">
                <p className="text-purple-100 text-xs font-bold uppercase tracking-widest mb-2">
                  Today's Reflection
                </p>
                <h3 className="text-2xl md:text-3xl font-bold">
                  {loading
                    ? "Searching..."
                    : todayDevo?.title || "Walking by Faith"}
                </h3>
              </div>
              <CardContent className="p-8 bg-slate-50">
                <div className="space-y-6">
                  <div className="italic text-gray-700 border-l-4 border-purple-300 pl-6 py-2 text-lg">
                    {loading ? (
                      <div className="space-y-2">
                        <div className="h-4 bg-slate-200 animate-pulse rounded w-full"></div>
                        <div className="h-4 bg-slate-200 animate-pulse rounded w-5/6"></div>
                      </div>
                    ) : (
                      <p className="line-clamp-3">
                        "
                        {todayDevo?.bibleText.text ||
                          "For we walk by faith, not by sight."}
                        "
                      </p>
                    )}
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="font-bold text-purple-600">
                      {loading
                        ? "..."
                        : todayDevo?.bibleText.verse || "2 Corinthians 5:7"}
                    </p>
                    <Link
                      href="/devotional"
                      className="inline-flex items-center text-sm font-bold text-gray-900 hover:text-purple-600 transition-colors group"
                    >
                      Continue Reading{" "}
                      <ArrowRight className="ml-1 w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
