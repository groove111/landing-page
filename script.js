// ========================================
// FAQアコーディオン機能
// ========================================
document.addEventListener('DOMContentLoaded', function() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', () => {
            // 現在のアイテムが開いているかチェック
            const isActive = item.classList.contains('active');
            
            // すべてのFAQアイテムを閉じる
            faqItems.forEach(faqItem => {
                faqItem.classList.remove('active');
            });
            
            // クリックされたアイテムが閉じていた場合のみ開く
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });
});

// ========================================
// スムーズスクロール機能
// ========================================
document.addEventListener('DOMContentLoaded', function() {
    const scrollLinks = document.querySelectorAll('a[href^="#"]');
    
    scrollLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // ハッシュのみのリンクは処理しない
            if (href === '#') {
                return;
            }
            
            e.preventDefault();
            
            const targetId = href.substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                // スムーズスクロール
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                
                // URLにハッシュを追加（履歴に残す）
                history.pushState(null, null, href);
            }
        });
    });
});

// ========================================
// フローティングCTAボタンの表示/非表示
// ========================================
document.addEventListener('DOMContentLoaded', function() {
    const floatingCta = document.querySelector('.floating-cta');
    const heroSection = document.querySelector('.hero');
    
    if (!floatingCta || !heroSection) return;
    
    // ヒーローセクションの高さを取得
    const heroHeight = heroSection.offsetHeight;
    
    window.addEventListener('scroll', () => {
        const scrollPosition = window.scrollY;
        
        // ヒーローセクションを超えたらフローティングボタンを表示
        if (scrollPosition > heroHeight) {
            floatingCta.style.display = 'block';
        } else {
            floatingCta.style.display = 'none';
        }
    });
    
    // 初期状態では非表示
    floatingCta.style.display = 'none';
});

// ========================================
// スクロールアニメーション（フェードイン効果）
// ========================================
document.addEventListener('DOMContentLoaded', function() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // アニメーション対象の要素を選択
    const animateElements = document.querySelectorAll(
        '.problem-card, .benefit-card, .feature-card, .testimonial-card, .usage-step'
    );
    
    animateElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(element);
    });
});

// ========================================
// LINE友だち追加ボタンのクリック追跡
// ========================================
document.addEventListener('DOMContentLoaded', function() {
    const lineButtons = document.querySelectorAll('a[href*="line.me"]');
    
    lineButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Google Analyticsなどのトラッキングコードをここに追加可能
            console.log('LINE友だち追加ボタンがクリックされました');
            
            // 例：Google Analytics（実装時にコメント解除）
            // if (typeof gtag !== 'undefined') {
            //     gtag('event', 'click', {
            //         'event_category': 'CTA',
            //         'event_label': 'LINE友だち追加',
            //         'value': 1
            //     });
            // }
        });
    });
});

// ========================================
// ページ読み込み時のローディングアニメーション
// ========================================
window.addEventListener('load', function() {
    document.body.style.opacity = '0';
    
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
});

// ========================================
// レスポンシブ対応：モバイルメニューなどの追加機能用
// ========================================
document.addEventListener('DOMContentLoaded', function() {
    // 画面サイズに応じた処理
    function handleResize() {
        const width = window.innerWidth;
        
        if (width < 768) {
            // モバイル表示時の処理
            adjustMobileLayout();
        } else {
            // デスクトップ表示時の処理
            adjustDesktopLayout();
        }
    }
    
    function adjustMobileLayout() {
        // CTAボタンのテキストを短縮（モバイル用）
        const floatingBtn = document.querySelector('.btn-floating span');
        if (floatingBtn && window.innerWidth < 400) {
            floatingBtn.textContent = 'LINE登録';
        }
    }
    
    function adjustDesktopLayout() {
        // デスクトップ用の処理
        const floatingBtn = document.querySelector('.btn-floating span');
        if (floatingBtn) {
            floatingBtn.textContent = 'LINE登録でお得に試す';
        }
    }
    
    // 初回実行
    handleResize();
    
    // リサイズイベントリスナー
    window.addEventListener('resize', handleResize);
});

// ========================================
// パフォーマンス最適化：画像の遅延読み込み
// ========================================
document.addEventListener('DOMContentLoaded', function() {
    // Intersection Observer を使用した画像の遅延読み込み
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    observer.unobserve(img);
                }
            }
        });
    });
    
    // data-src属性を持つ画像を監視
    const lazyImages = document.querySelectorAll('img[data-src]');
    lazyImages.forEach(img => imageObserver.observe(img));
});

// ========================================
// エラーハンドリング
// ========================================
window.addEventListener('error', function(e) {
    console.error('エラーが発生しました:', e.error);
    // エラー時の処理（必要に応じて実装）
});

// ========================================
// カウントダウンタイマー（オプション：キャンペーン期限表示用）
// ========================================
function initCountdownTimer(targetDate, elementId) {
    const countdownElement = document.getElementById(elementId);
    if (!countdownElement) return;
    
    function updateCountdown() {
        const now = new Date().getTime();
        const distance = targetDate - now;
        
        if (distance < 0) {
            countdownElement.innerHTML = 'キャンペーン終了';
            return;
        }
        
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
        countdownElement.innerHTML = `${days}日 ${hours}時間 ${minutes}分 ${seconds}秒`;
    }
    
    updateCountdown();
    setInterval(updateCountdown, 1000);
}

// 使用例（必要に応じてコメント解除）
// const campaignEndDate = new Date('2024-12-31 23:59:59').getTime();
// initCountdownTimer(campaignEndDate, 'countdown-timer');