diff --git a/js/script.js b/js/script.js
index 0af71679be349122315632c05f47e2d4c7bc6935..7ea0a7a4f83164ce32d55f7bc51d1495fdefc874 100644
--- a/js/script.js
+++ b/js/script.js
@@ -1,85 +1,104 @@
+const LINE_INVITE_URL = 'https://lin.ee/qoYJ553';
+const LINE_LINK_SELECTOR = '[data-line-link]';
+
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
-    const scrollLinks = document.querySelectorAll('a[href^="#"]');
+    // LINE CTAボタンなど、外部リンクに置き換わる要素は除外
+    const scrollLinks = document.querySelectorAll(`a[href^="#"]:not(${LINE_LINK_SELECTOR})`);
     
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
 
+// ========================================
+// LINEリンク自動設定
+// ========================================
+document.addEventListener('DOMContentLoaded', function() {
+    const lineButtons = document.querySelectorAll(LINE_LINK_SELECTOR);
+
+    function applyLineInviteLink(button) {
+        button.href = LINE_INVITE_URL;
+        button.target = '_blank';
+        button.rel = 'noopener noreferrer';
+    }
+
+    lineButtons.forEach(applyLineInviteLink);
+});
+
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
