// 无境探索论坛 - 主脚本文件

// 等待DOM加载完成
// 添加错误处理
window.addEventListener('error', function(e) {
    console.error('JavaScript错误:', e.error);
});

// 添加未处理的Promise拒绝处理
window.addEventListener('unhandledrejection', function(e) {
    console.error('未处理的Promise拒绝:', e.reason);
});

document.addEventListener('DOMContentLoaded', function() {
    // 移动端菜单切换
    const menuToggle = document.getElementById('menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (menuToggle && mobileMenu) {
        menuToggle.addEventListener('click', function() {
            mobileMenu.classList.toggle('hidden');
        });
    }
    
    // 搜索功能
    const searchForm = document.getElementById('search-form');
    const searchInput = document.getElementById('search-input');
    
    if (searchForm) {
        searchForm.addEventListener('submit', function(e) {
            e.preventDefault();
            if (searchInput && searchInput.value.trim()) {
                alert(`搜索功能: "${searchInput.value.trim()}"`);
                // 实际项目中这里应该跳转到搜索结果页面
            }
        });
    }
    
    // 帖子点赞功能
    const likeButtons = document.querySelectorAll('.like-btn');
    likeButtons.forEach(button => {
        button.addEventListener('click', function() {
            const likeCount = this.querySelector('.like-count');
            const currentLikes = parseInt(likeCount.textContent);
            
            if (this.classList.contains('liked')) {
                // 取消点赞
                likeCount.textContent = currentLikes - 1;
                this.classList.remove('liked');
                this.querySelector('i').classList.remove('text-red-500');
                this.querySelector('i').classList.add('text-gray-500');
            } else {
                // 点赞
                likeCount.textContent = currentLikes + 1;
                this.classList.add('liked');
                this.querySelector('i').classList.remove('text-gray-500');
                this.querySelector('i').classList.add('text-red-500');
            }
        });
    });
    
    // 收藏帖子功能
    const bookmarkButtons = document.querySelectorAll('.bookmark-btn');
    bookmarkButtons.forEach(button => {
        button.addEventListener('click', function() {
            if (this.classList.contains('bookmarked')) {
                // 取消收藏
                this.classList.remove('bookmarked');
                this.querySelector('i').classList.remove('text-blue-500');
                this.querySelector('i').classList.add('text-gray-500');
                showNotification('已取消收藏', 'info');
            } else {
                // 收藏
                this.classList.add('bookmarked');
                this.querySelector('i').classList.remove('text-gray-500');
                this.querySelector('i').classList.add('text-blue-500');
                showNotification('收藏成功', 'success');
            }
        });
    });
    
    // 分类切换
    const categoryLinks = document.querySelectorAll('.category-link');
    categoryLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            // 移除所有活跃状态
            categoryLinks.forEach(item => item.classList.remove('active'));
            // 添加当前活跃状态
            this.classList.add('active');
            
            // 更新页面标题
            const categoryName = this.querySelector('span').textContent;
            const postTitle = document.querySelector('.post-title');
            if (postTitle) {
                postTitle.textContent = categoryName;
            }
            
            // 显示加载状态
            showLoading();
            
            // 模拟加载延迟
            setTimeout(() => {
                hideLoading();
                showNotification(`已切换到 ${categoryName} 分类`, 'success');
            }, 800);
        });
    });
    
    // 分页功能
    const paginationLinks = document.querySelectorAll('.pagination-link');
    paginationLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            if (!this.classList.contains('active')) {
                e.preventDefault();
                // 显示加载状态
                showLoading();
                
                // 模拟加载延迟
                setTimeout(() => {
                    hideLoading();
                    const pageNum = this.textContent;
                    showNotification(`已切换到第 ${pageNum} 页`, 'info');
                }, 500);
            }
        });
    });
    
    // 显示/隐藏侧边栏（在平板设备上）
    const sidebarToggle = document.getElementById('sidebar-toggle');
    const sidebar = document.querySelector('.sidebar');
    
    if (sidebarToggle && sidebar) {
        sidebarToggle.addEventListener('click', function() {
            sidebar.classList.toggle('hidden');
            sidebar.classList.toggle('absolute');
            sidebar.classList.toggle('top-16');
            sidebar.classList.toggle('left-0');
            sidebar.classList.toggle('z-30');
            sidebar.classList.toggle('w-72');
        });
    }
    
    // 创建帖子按钮
    const createPostBtns = document.querySelectorAll('.create-post-btn, .floating-btn');
    createPostBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            showNotification('跳转到发布帖子页面', 'info');
            // 实际项目中这里应该跳转到发布帖子页面
        });
    });
    
    // 用户菜单
    const userAvatar = document.querySelector('.user-avatar');
    const userDropdown = document.querySelector('.dropdown-menu');
    
    if (userAvatar && userDropdown) {
        userAvatar.addEventListener('click', function(e) {
            e.stopPropagation();
            userDropdown.classList.toggle('hidden');
        });
    }
    
    // 点击页面其他地方关闭下拉菜单
    document.addEventListener('click', function() {
        if (userDropdown && !userDropdown.classList.contains('hidden')) {
            userDropdown.classList.add('hidden');
        }
    });
    
    // 阻止下拉菜单内部点击事件冒泡
    if (userDropdown) {
        userDropdown.addEventListener('click', function(e) {
            e.stopPropagation();
        });
    }
    
    // 导航栏滚动效果
    const navbar = document.querySelector('.navbar');
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 100) {
            navbar.classList.add('navbar-scrolled');
        } else {
            navbar.classList.remove('navbar-scrolled');
        }
        
        lastScrollTop = scrollTop;
    });
    
    // 初始化时检查滚动位置
    if (window.pageYOffset > 100 && navbar) {
        navbar.classList.add('navbar-scrolled');
    }
});

// 显示加载状态
function showLoading() {
    const postList = document.querySelector('.post-list');
    if (postList) {
        const loadingHTML = `
            <div class="loading py-10">
                <div class="loading-spinner"></div>
            </div>
        `;
        postList.innerHTML = loadingHTML;
    }
}

// 隐藏加载状态
function hideLoading() {
    // 实际项目中这里应该重新加载内容
}

// 显示通知
function showNotification(message, type = 'info') {
    // 移除已存在的通知
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // 创建新通知
    const notification = document.createElement('div');
    notification.className = 'notification';
    
    let icon = 'info-circle';
    let bgColor = '#3b82f6';
    
    switch(type) {
        case 'success':
            icon = 'check-circle';
            bgColor = '#10b981';
            break;
        case 'error':
            icon = 'exclamation-circle';
            bgColor = '#ef4444';
            break;
        case 'warning':
            icon = 'exclamation-triangle';
            bgColor = '#f59e0b';
            break;
    }
    
    notification.innerHTML = `
        <div class="notification-header" style="border-left: 4px solid ${bgColor};">
            <div class="notification-title">
                <i class="fas fa-${icon}"></i> ${type === 'info' ? '提示' : 
                                           type === 'success' ? '成功' : 
                                           type === 'error' ? '错误' : '警告'}
            </div>
            <button class="notification-close">
                <i class="fas fa-times"></i>
            </button>
        </div>
        <div class="notification-body">${message}</div>
    `;
    
    document.body.appendChild(notification);
    
    // 关闭按钮事件
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', function() {
        notification.remove();
    });
    
    // 3秒后自动关闭
    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transform = 'translateX(100%)';
        notification.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
        
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// 验证表单
function validateForm(formId) {
    const form = document.getElementById(formId);
    if (!form) return false;
    
    const inputs = form.querySelectorAll('input[required], textarea[required], select[required]');
    let isValid = true;
    
    inputs.forEach(input => {
        if (!input.value.trim()) {
            isValid = false;
            input.classList.add('border-red-500');
            input.classList.add('bg-red-50');
            
            // 添加错误提示
            const errorText = document.createElement('p');
            errorText.className = 'text-red-500 text-xs mt-1';
            errorText.textContent = '此字段为必填项';
            errorText.id = `${input.id}-error`;
            
            // 检查是否已存在错误提示
            const existingError = document.getElementById(`${input.id}-error`);
            if (!existingError) {
                input.parentNode.appendChild(errorText);
            }
        } else {
            input.classList.remove('border-red-500');
            input.classList.remove('bg-red-50');
            
            // 移除错误提示
            const errorText = document.getElementById(`${input.id}-error`);
            if (errorText) {
                errorText.remove();
            }
        }
    });
    
    return isValid;
}

// 处理用户登录
function handleLogin(username, password) {
    // 实际项目中这里应该发送登录请求到服务器
    console.log('Login attempt with:', username, password);
    showNotification('登录成功，欢迎回来！', 'success');
    return true;
}

// 处理用户注册
function handleRegister(userData) {
    // 实际项目中这里应该发送注册请求到服务器
    console.log('Register attempt with:', userData);
    showNotification('注册成功，请登录！', 'success');
    return true;
}

// 移动端触摸手势支持
class TouchGestures {
    constructor() {
        this.touchStartX = 0;
        this.touchStartY = 0;
        this.touchEndX = 0;
        this.touchEndY = 0;
        this.minSwipeDistance = 50;
        this.maxVerticalDistance = 100;
    }
    
    init() {
        document.addEventListener('touchstart', this.handleTouchStart.bind(this), { passive: true });
        document.addEventListener('touchend', this.handleTouchEnd.bind(this), { passive: true });
    }
    
    handleTouchStart(e) {
        this.touchStartX = e.changedTouches[0].screenX;
        this.touchStartY = e.changedTouches[0].screenY;
    }
    
    handleTouchEnd(e) {
        this.touchEndX = e.changedTouches[0].screenX;
        this.touchEndY = e.changedTouches[0].screenY;
        this.handleSwipe();
    }
    
    handleSwipe() {
        const horizontalDistance = this.touchEndX - this.touchStartX;
        const verticalDistance = Math.abs(this.touchEndY - this.touchStartY);
        
        // 检查是否为有效滑动
        if (Math.abs(horizontalDistance) < this.minSwipeDistance || verticalDistance > this.maxVerticalDistance) {
            return;
        }
        
        // 向右滑动 - 显示侧边栏
        if (horizontalDistance > 0) {
            this.showSidebar();
        }
        // 向左滑动 - 隐藏侧边栏
        else {
            this.hideSidebar();
        }
    }
    
    showSidebar() {
        const sidebar = document.querySelector('.sidebar');
        const mobileMenu = document.getElementById('mobile-menu');
        
        if (sidebar && window.innerWidth <= 768) {
            sidebar.classList.remove('hidden');
            sidebar.classList.add('slide-in');
        }
    }
    
    hideSidebar() {
        const sidebar = document.querySelector('.sidebar');
        const mobileMenu = document.getElementById('mobile-menu');
        
        if (sidebar && window.innerWidth <= 768) {
            sidebar.classList.add('hidden');
            sidebar.classList.remove('slide-in');
        }
    }
}

// 图片懒加载
class LazyLoader {
    constructor() {
        this.observer = null;
        this.init();
    }
    
    init() {
        if ('IntersectionObserver' in window) {
            this.observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        this.loadImage(entry.target);
                    }
                });
            }, {
                rootMargin: '50px'
            });
            
            this.observeImages();
        } else {
            // 降级处理
            this.loadAllImages();
        }
    }
    
    observeImages() {
        const lazyImages = document.querySelectorAll('img[data-src]');
        lazyImages.forEach(img => this.observer.observe(img));
    }
    
    loadImage(img) {
        const src = img.dataset.src;
        if (src) {
            img.src = src;
            img.classList.remove('lazy-loading');
            img.classList.add('lazy-loaded');
            this.observer.unobserve(img);
        }
    }
    
    loadAllImages() {
        const lazyImages = document.querySelectorAll('img[data-src]');
        lazyImages.forEach(img => this.loadImage(img));
    }
}

// 移动端优化
class MobileOptimization {
    constructor() {
        this.init();
    }
    
    init() {
        this.optimizeViewport();
        this.preventZoomOnInput();
        this.addTouchFeedback();
        this.handleOrientationChange();
    }
    
    optimizeViewport() {
        const viewport = document.querySelector('meta[name="viewport"]');
        if (viewport) {
            viewport.setAttribute('content', 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no');
        }
    }
    
    preventZoomOnInput() {
        const inputs = document.querySelectorAll('input, textarea, select');
        inputs.forEach(input => {
            input.addEventListener('focus', () => {
                document.querySelector('meta[name="viewport"]').setAttribute('content', 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no');
            });
        });
    }
    
    addTouchFeedback() {
        const touchElements = document.querySelectorAll('.btn, .post-card, .category-link, .pagination-link');
        touchElements.forEach(element => {
            element.addEventListener('touchstart', () => {
                element.style.transform = 'scale(0.98)';
                element.style.transition = 'transform 0.1s ease';
            });
            
            element.addEventListener('touchend', () => {
                element.style.transform = 'scale(1)';
            });
        });
    }
    
    handleOrientationChange() {
        window.addEventListener('orientationchange', () => {
            setTimeout(() => {
                window.scrollTo(0, 0);
                this.adjustLayoutForOrientation();
            }, 100);
        });
    }
    
    adjustLayoutForOrientation() {
        const isLandscape = window.innerWidth > window.innerHeight;
        const navbar = document.querySelector('.navbar');
        const sidebar = document.querySelector('.sidebar');
        
        if (isLandscape && window.innerWidth <= 768) {
            // 横屏模式优化
            navbar?.classList.add('compact');
            sidebar?.classList.add('landscape-mode');
        } else {
            navbar?.classList.remove('compact');
            sidebar?.classList.remove('landscape-mode');
        }
    }
}

// 性能优化
class PerformanceOptimizer {
    constructor() {
        this.init();
    }
    
    init() {
        this.debounceScroll();
        this.optimizeImages();
        this.addPrefetch();
    }
    
    debounceScroll() {
        let ticking = false;
        
        window.addEventListener('scroll', () => {
            if (!ticking) {
                requestAnimationFrame(() => {
                    this.handleScroll();
                    ticking = false;
                });
                ticking = true;
            }
        });
    }
    
    handleScroll() {
        const navbar = document.querySelector('.navbar');
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 100) {
            navbar?.classList.add('navbar-scrolled');
        } else {
            navbar?.classList.remove('navbar-scrolled');
        }
    }
    
    optimizeImages() {
        const images = document.querySelectorAll('img');
        images.forEach(img => {
            img.loading = 'lazy';
            img.decoding = 'async';
        });
    }
    
    addPrefetch() {
        const importantLinks = document.querySelectorAll('a[href^="/"], a[href^="http"]');
        importantLinks.forEach(link => {
            if (link.hostname === window.location.hostname) {
                const prefetchLink = document.createElement('link');
                prefetchLink.rel = 'prefetch';
                prefetchLink.href = link.href;
                document.head.appendChild(prefetchLink);
            }
        });
    }
}

// 初始化移动端功能
document.addEventListener('DOMContentLoaded', function() {
    // 初始化触摸手势
    const touchGestures = new TouchGestures();
    touchGestures.init();
    
    // 初始化懒加载
    const lazyLoader = new LazyLoader();
    
    // 初始化移动端优化
    const mobileOpt = new MobileOptimization();
    
    // 初始化性能优化
    const perfOptimizer = new PerformanceOptimizer();
    
    // 检测设备类型
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    const isTablet = /iPad|Android/i.test(navigator.userAgent) && window.innerWidth > 768;
    
    if (isMobile) {
        document.body.classList.add('mobile-device');
    }
    
    if (isTablet) {
        document.body.classList.add('tablet-device');
    }
    
    // 添加网络状态监听
    window.addEventListener('online', () => {
        showNotification('网络连接已恢复', 'success');
    });
    
    window.addEventListener('offline', () => {
        showNotification('网络连接已断开', 'warning');
    });
    
    // 添加页面可见性API
    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            console.log('页面已隐藏');
        } else {
            console.log('页面已显示');
        }
    });
    
    // 搜索建议功能
    const searchInput = document.getElementById('search-input');
    let searchSuggestions = document.getElementById('search-suggestions');
    
    if (!searchSuggestions && searchInput) {
        searchSuggestions = document.createElement('div');
        searchSuggestions.id = 'search-suggestions';
        searchSuggestions.className = 'search-suggestions';
        searchInput.parentNode.appendChild(searchSuggestions);
    }
        
        // 模拟搜索数据
        const searchData = [
            '西藏自驾游攻略',
            '云南丽江旅游',
            '北京周边游推荐',
            '成都美食攻略',
            '三亚海岛度假',
            '西安历史文化游',
            '上海迪士尼攻略',
            '杭州西湖美景',
            '青海湖环湖路线',
            '新疆天山风光'
        ];
        
        let searchTimeout;
        
        searchInput.addEventListener('input', function() {
            clearTimeout(searchTimeout);
            const query = this.value.trim();
            
            if (query.length < 2) {
                if (searchSuggestions) {
                    searchSuggestions.style.display = 'none';
                }
                return;
            }
            
            searchTimeout = setTimeout(() => {
                const filteredData = searchData.filter(item => 
                    item.toLowerCase().includes(query.toLowerCase())
                );
                
                if (filteredData.length > 0 && searchSuggestions) {
                    displaySearchSuggestions(filteredData, query);
                } else if (searchSuggestions) {
                    searchSuggestions.style.display = 'none';
                }
            }, 300);
        });
        
        searchInput.addEventListener('focus', function() {
            if (this.value.trim().length >= 2 && searchSuggestions) {
                searchSuggestions.style.display = 'block';
            }
        });
        
        document.addEventListener('click', function(e) {
            if (searchInput && searchSuggestions && 
                !searchInput.contains(e.target) && !searchSuggestions.contains(e.target)) {
                searchSuggestions.style.display = 'none';
            }
        });
    }
    
    function displaySearchSuggestions(suggestions, query) {
        searchSuggestions.innerHTML = suggestions.map(suggestion => `
            <div class="suggestion-item" data-suggestion="${suggestion}">
                <i class="fas fa-search text-gray-400 mr-2"></i>
                <span>${highlightMatch(suggestion, query)}</span>
            </div>
        `).join('');
        
        searchSuggestions.style.display = 'block';
        
        // 添加点击事件
        const suggestionItems = searchSuggestions.querySelectorAll('.suggestion-item');
        suggestionItems.forEach(item => {
            item.addEventListener('click', function() {
                searchInput.value = this.dataset.suggestion;
                searchSuggestions.style.display = 'none';
                searchInput.closest('form').dispatchEvent(new Event('submit'));
            });
        });
    }
    
    function highlightMatch(text, query) {
        const regex = new RegExp(`(${query})`, 'gi');
        return text.replace(regex, '<strong>$1</strong>');
    }
    
    // 回到顶部功能
    const backToTopBtn = document.createElement('button');
    backToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    backToTopBtn.className = 'back-to-top-btn';
    backToTopBtn.style.cssText = `
        position: fixed;
        bottom: 100px;
        right: 24px;
        width: 48px;
        height: 48px;
        background: #2563eb;
        color: white;
        border: none;
        border-radius: 50%;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        z-index: 1000;
        box-shadow: 0 2px 8px rgba(37, 99, 235, 0.3);
    `;
    
    document.body.appendChild(backToTopBtn);
    
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTopBtn.style.opacity = '1';
            backToTopBtn.style.visibility = 'visible';
        } else {
            backToTopBtn.style.opacity = '0';
            backToTopBtn.style.visibility = 'hidden';
        }
    });
    
    backToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // 主题切换功能
    const themeToggle = document.createElement('button');
    themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    themeToggle.className = 'theme-toggle';
    themeToggle.style.cssText = `
        position: fixed;
        bottom: 160px;
        right: 24px;
        width: 48px;
        height: 48px;
        background: #64748b;
        color: white;
        border: none;
        border-radius: 50%;
        cursor: pointer;
        z-index: 1000;
        box-shadow: 0 2px 8px rgba(100, 116, 139, 0.3);
        transition: all 0.3s ease;
    `;
    
    document.body.appendChild(themeToggle);
    
    // 检查本地存储的主题设置
    const savedTheme = localStorage.getItem('theme') || 'light';
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-theme');
        themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
        themeToggle.style.background = '#f59e0b';
    }
    
    themeToggle.addEventListener('click', function() {
        document.body.classList.toggle('dark-theme');
        const isDark = document.body.classList.contains('dark-theme');
        
        if (isDark) {
            this.innerHTML = '<i class="fas fa-sun"></i>';
            this.style.background = '#f59e0b';
            localStorage.setItem('theme', 'dark');
            showNotification('已切换到深色模式', 'success');
        } else {
            this.innerHTML = '<i class="fas fa-moon"></i>';
            this.style.background = '#64748b';
            localStorage.setItem('theme', 'light');
            showNotification('已切换到浅色模式', 'success');
        }
    });
    
    // 快捷键支持
    document.addEventListener('keydown', function(e) {
        // Ctrl/Cmd + K 打开搜索
        if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
            e.preventDefault();
            searchInput?.focus();
        }
        
        // ESC 关闭搜索建议
        if (e.key === 'Escape') {
            if (searchSuggestions) {
                searchSuggestions.style.display = 'none';
            }
            if (searchInput) {
                searchInput.blur();
            }
        }
        
        // Ctrl/Cmd + / 显示快捷键帮助
        if ((e.ctrlKey || e.metaKey) && e.key === '/') {
            e.preventDefault();
            showKeyboardShortcuts();
        }
    });
    
    function showKeyboardShortcuts() {
        const shortcutsHTML = `
            <div class="keyboard-shortcuts">
                <h3>键盘快捷键</h3>
                <div class="shortcut-list">
                    <div class="shortcut-item">
                        <kbd>Ctrl</kbd> + <kbd>K</kbd>
                        <span>打开搜索</span>
                    </div>
                    <div class="shortcut-item">
                        <kbd>Esc</kbd>
                        <span>关闭弹窗</span>
                    </div>
                    <div class="shortcut-item">
                        <kbd>Ctrl</kbd> + <kbd>/</kbd>
                        <span>显示快捷键</span>
                    </div>
                    <div class="shortcut-item">
                        <kbd>Home</kbd>
                        <span>回到顶部</span>
                    </div>
                    <div class="shortcut-item">
                        <kbd>End</kbd>
                        <span>回到底部</span>
                    </div>
                </div>
            </div>
        `;
        
        showNotification(shortcutsHTML, 'info', 5000);
    }
    
    // 图片预览功能
    const images = document.querySelectorAll('.post-image img, .content img');
    images.forEach(img => {
        img.style.cursor = 'zoom-in';
        img.addEventListener('click', function() {
            showImagePreview(this.src);
        });
    });
    
    function showImagePreview(src) {
        const preview = document.createElement('div');
        preview.className = 'image-preview';
        preview.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.9);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 9999;
            cursor: zoom-out;
        `;
        
        const img = document.createElement('img');
        img.src = src;
        img.style.cssText = `
            max-width: 90%;
            max-height: 90%;
            object-fit: contain;
            border-radius: 8px;
        `;
        
        preview.appendChild(img);
        document.body.appendChild(preview);
        
        preview.addEventListener('click', function() {
            this.remove();
        });
        
        // ESC 键关闭预览
        const closePreview = (e) => {
            if (e.key === 'Escape') {
                preview.remove();
                document.removeEventListener('keydown', closePreview);
            }
        };
        document.addEventListener('keydown', closePreview);
    }
    
    // 复制链接功能
    const copyButtons = document.querySelectorAll('.copy-link-btn');
    copyButtons.forEach(button => {
        button.addEventListener('click', async function() {
            const url = window.location.href;
            
            try {
                await navigator.clipboard.writeText(url);
                showNotification('链接已复制到剪贴板', 'success');
            } catch (err) {
                // 降级处理
                const textArea = document.createElement('textarea');
                textArea.value = url;
                document.body.appendChild(textArea);
                textArea.select();
                document.execCommand('copy');
                document.body.removeChild(textArea);
                showNotification('链接已复制到剪贴板', 'success');
            }
        });
    });
    
    // 分享功能
    const shareButtons = document.querySelectorAll('.share-btn');
    shareButtons.forEach(button => {
        button.addEventListener('click', function() {
            if (navigator.share) {
                navigator.share({
                    title: document.title,
                    text: '来自无境探索论坛的精彩内容',
                    url: window.location.href
                }).then(() => {
                    showNotification('分享成功', 'success');
                }).catch(() => {
                    showShareModal();
                });
            } else {
                showShareModal();
            }
        });
    });
    
    function showShareModal() {
        const modalHTML = `
            <div class="share-modal">
                <div class="share-modal-content">
                    <h3>分享到</h3>
                    <div class="share-options">
                        <button class="share-option" data-platform="wechat">
                            <i class="fab fa-weixin"></i>
                            <span>微信</span>
                        </button>
                        <button class="share-option" data-platform="weibo">
                            <i class="fab fa-weibo"></i>
                            <span>微博</span>
                        </button>
                        <button class="share-option" data-platform="qq">
                            <i class="fab fa-qq"></i>
                            <span>QQ</span>
                        </button>
                        <button class="share-option" data-platform="link">
                            <i class="fas fa-link"></i>
                            <span>复制链接</span>
                        </button>
                    </div>
                    <button class="close-modal">关闭</button>
                </div>
            </div>
        `;
        
        showNotification(modalHTML, 'info', 10000);
    }
});