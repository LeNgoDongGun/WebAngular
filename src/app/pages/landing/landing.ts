import {
  Component, OnInit, AfterViewInit,
  HostListener, Inject, PLATFORM_ID
} from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterModule } from '@angular/router';

/* ─── Interfaces ─────────────────────────────────────────── */
interface Court {
  id: number; name: string; sport: string;
  image: string; price: number; rating: number;
  reviews: number; location: string;
  badge?: string; badgeColor?: string;
}
interface SportType {
  id: string; name: string; icon: string;
  count: number; color: string; gradient: string;
}
interface BlogPost {
  id: number; title: string; excerpt: string;
  image: string; category: string;
  categoryColor: string; date: string; readTime: string;
}
interface Stat {
  value: number; current: number;
  label: string; suffix: string; icon: string;
}

/* ─── Component ──────────────────────────────────────────── */
@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './landing.html',
  styleUrls: ['./landing.scss']
})
export class LandingComponent implements OnInit, AfterViewInit {

  /* State */
  isScrolled = false;
  mobileMenuOpen = false;
  activeTestimonial = 0;
  setTestimonial(i: number) {
    this.activeTestimonial = i;
  }
  hoveredSport: string | null = null;

  /* ── Stats ──────────────────────────────────────────────── */
  stats: Stat[] = [
    { value: 500, current: 0, label: 'Sân thể thao', suffix: '+', icon: '🏟️' },
    { value: 12000, current: 0, label: 'Khách hàng', suffix: '+', icon: '👥' },
    { value: 50, current: 0, label: 'Địa điểm', suffix: '+', icon: '📍' },
    { value: 99, current: 0, label: 'Hài lòng', suffix: '%', icon: '⭐' }
  ];

  /* ── Sport Types ────────────────────────────────────────── */
  sportTypes: SportType[] = [
    { id: 'football', name: 'Bóng Đá', icon: '⚽', count: 120, color: '#00E87B', gradient: 'linear-gradient(135deg,#00E87B22,#00E87B08)' },
    { id: 'volleyball', name: 'Bóng Chuyền', icon: '🏐', count: 85, color: '#00B4FF', gradient: 'linear-gradient(135deg,#00B4FF22,#00B4FF08)' },
    { id: 'basketball', name: 'Bóng Rổ', icon: '🏀', count: 95, color: '#FF6B35', gradient: 'linear-gradient(135deg,#FF6B3522,#FF6B3508)' },
    { id: 'badminton', name: 'Cầu Lông', icon: '🏸', count: 110, color: '#A78BFA', gradient: 'linear-gradient(135deg,#A78BFA22,#A78BFA08)' },
    { id: 'pickleball', name: 'Pickleball', icon: '🎾', count: 75, color: '#F59E0B', gradient: 'linear-gradient(135deg,#F59E0B22,#F59E0B08)' }
  ];

  /* ── Courts ─────────────────────────────────────────────── */
  featuredCourts: Court[] = [
    { id: 1, name: 'Sân Bóng Đá Mini Arena', sport: 'Bóng Đá', image: 'https://images.unsplash.com/photo-1529900748604-07564a03e7a6?w=600&q=80', price: 150000, rating: 4.9, reviews: 234, location: 'Quy Nhơn', badge: 'HOT 🔥', badgeColor: '#FF6B35' },
    { id: 2, name: 'Sky Court Bóng Rổ', sport: 'Bóng Rổ', image: 'https://images.unsplash.com/photo-1546519638405-a9f66aebfd3e?w=600&q=80', price: 120000, rating: 4.7, reviews: 187, location: 'Bình Định' },
    { id: 3, name: 'Premium Cầu Lông Club', sport: 'Cầu Lông', image: 'https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?w=600&q=80', price: 80000, rating: 4.8, reviews: 312, location: 'Quy Nhơn', badge: 'MỚI ✨', badgeColor: '#00E87B' },
    { id: 4, name: 'Pickleball Paradise Court', sport: 'Pickleball', image: 'https://images.unsplash.com/photo-1554068865-24cecd4e34b8?w=600&q=80', price: 100000, rating: 4.6, reviews: 98, location: 'Bình Định' },
    { id: 5, name: 'Volleyball Beach Court', sport: 'Bóng Chuyền', image: 'https://images.unsplash.com/photo-1612872087720-bb876e2e67d1?w=600&q=80', price: 90000, rating: 4.5, reviews: 156, location: 'Quy Nhơn' },
    { id: 6, name: 'Elite Football Stadium', sport: 'Bóng Đá', image: 'https://images.unsplash.com/photo-1575361204480-aadea25e6e68?w=600&q=80', price: 200000, rating: 5.0, reviews: 89, location: 'Bình Định', badge: 'VIP 👑', badgeColor: '#F59E0B' }
  ];

  /* ── Blog ───────────────────────────────────────────────── */
  blogPosts: BlogPost[] = [
    { id: 1, title: 'Bí quyết cải thiện kỹ năng bóng đá cho người mới bắt đầu', excerpt: 'Khám phá những bài tập cơ bản giúp bạn nhanh chóng nâng cao trình độ trong thời gian ngắn nhất.', image: 'https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?w=600&q=80', category: 'Bóng Đá', categoryColor: '#00E87B', date: '12 Tháng 5, 2025', readTime: '5 phút đọc' },
    { id: 2, title: 'Pickleball — Môn thể thao đang làm mưa làm gió tại Việt Nam', excerpt: 'Tìm hiểu tại sao Pickleball lại trở thành môn thể thao được yêu thích và phát triển mạnh nhất hiện nay.', image: 'https://images.unsplash.com/photo-1554068865-24cecd4e34b8?w=600&q=80', category: 'Pickleball', categoryColor: '#F59E0B', date: '8 Tháng 5, 2025', readTime: '4 phút đọc' },
    { id: 3, title: 'Top 10 sân cầu lông chất lượng nhất tại Quy Nhơn 2025', excerpt: 'Danh sách những sân cầu lông với trang thiết bị hiện đại, giá cả hợp lý dành cho mọi đối tượng.', image: 'https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?w=600&q=80', category: 'Cầu Lông', categoryColor: '#A78BFA', date: '3 Tháng 5, 2025', readTime: '6 phút đọc' }
  ];

  /* ── Testimonials ───────────────────────────────────────── */
  testimonials = [
    { name: 'Nguyễn Văn Hùng', initials: 'NH', role: 'Cầu thủ nghiệp dư', sport: '⚽', color: '#00E87B', rating: 5, comment: 'App đặt sân cực kỳ tiện lợi! Mình đặt sân bóng đá chỉ mất 2 phút, giao diện đẹp và dễ dùng. Sẽ tiếp tục sử dụng dài dài!' },
    { name: 'Trần Thị Lan', initials: 'TL', role: 'HLV Cầu Lông', sport: '🏸', color: '#A78BFA', rating: 5, comment: 'Tìm được sân cầu lông chất lượng với giá hợp lý. Hệ thống nhắc nhở lịch rất hữu ích, chưa bao giờ trễ buổi tập!' },
    { name: 'Lê Minh Đức', initials: 'LĐ', role: 'VĐV Pickleball', sport: '🎾', color: '#F59E0B', rating: 5, comment: 'Sân Pickleball tuyệt vời! Đặt sân nhanh, thanh toán tiện, không phải chờ đợi. App không thể thiếu cho dân thể thao.' }
  ];

  /* ── Hero particles ─────────────────────────────────────── */
  particles = Array.from({ length: 18 }, (_, i) => ({
    id: i,
    icon: ['⚽', '🏀', '🏸', '🎾', '🏐', '🏆', '🥇', '⚡'][i % 8],
    x: Math.round(Math.random() * 95),
    y: Math.round(Math.random() * 95),
    dur: +(4 + Math.random() * 8).toFixed(1),
    del: +(Math.random() * 5).toFixed(1),
    sz: +(0.7 + Math.random() * 0.9).toFixed(2)
  }));

  /* ── Steps ──────────────────────────────────────────────── */
  steps = [
    { num: '01', icon: '🔍', title: 'Chọn Môn & Sân', desc: 'Duyệt danh sách sân theo môn thể thao, vị trí và tiện ích. Xem ảnh, đánh giá từ người dùng thực tế.' },
    { num: '02', icon: '📅', title: 'Chọn Ngày & Giờ', desc: 'Chọn ngày, khung giờ thuận tiện và thời lượng thuê. Lịch trống hiển thị theo thời gian thực.' },
    { num: '03', icon: '⚡', title: 'Đặt & Tận Hưởng', desc: 'Xác nhận đặt sân, thanh toán nhanh chóng và nhận thông báo. Đến sân là chơi ngay!' }
  ];

  constructor(@Inject(PLATFORM_ID) private platformId: Object) { }

  ngOnInit(): void { }

  ngAfterViewInit(): void {
    if (!isPlatformBrowser(this.platformId)) return;
    this.initScrollAnimations();
    this.initStatsObserver();
  }

  @HostListener('window:scroll')
  onScroll(): void {
    this.isScrolled = window.scrollY > 60;
  }

  toggleMenu(): void { this.mobileMenuOpen = !this.mobileMenuOpen; }

  initScrollAnimations(): void {
    const io = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('in-view'); }),
      { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
    );
    document.querySelectorAll('.anim').forEach(el => io.observe(el));
  }

  initStatsObserver(): void {
    const el = document.querySelector('.stats-section');
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { this.runCounters(); io.disconnect(); }
    }, { threshold: 0.3 });
    io.observe(el);
  }

  runCounters(): void {
    this.stats.forEach((stat, i) => {
      const steps = 80, dur = 2400;
      const inc = stat.value / steps;
      let cur = 0;
      const t = setInterval(() => {
        cur = Math.min(cur + inc, stat.value);
        this.stats[i] = { ...this.stats[i], current: Math.floor(cur) };
        if (cur >= stat.value) clearInterval(t);
      }, dur / steps);
    });
  }

  stars(r: number): number[] { return Array(5).fill(0).map((_, i) => i < Math.floor(r) ? 1 : 0); }

  price(p: number): string { return new Intl.NumberFormat('vi-VN').format(p) + 'đ/h'; }

  goto(id: string, e: Event): void {
    e.preventDefault();
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  }
}