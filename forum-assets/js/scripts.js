/**
 * 无境探索论坛 - 全局交互脚本
 */

// 等待DOM加载完成
document.addEventListener('DOMContentLoaded', function() {
    // 初始化页面加载动画
    initPageLoader();
    
    // 导航栏滚动效果
    initNavbarScroll();
    
    // 移动端菜单切换
    initMobileMenu();
    
    // 平滑滚动
    initSmoothScroll();
    
    // 悬浮按钮动画
    initFloatingButton();
    
    // 图片懒加载
    initLazyLoad();
    
    // 输入框焦点效果
    initInputFocus();
    
    // 下拉菜单功能
    initDropdownMenus();
    
    // 表单验证
    initFormValidation();
    
    // 搜索建议功能
    initSearchSuggestions();
    
    // 帖子交互功能
    initPostInteractions();
    
    // 工具提示
    initTooltips();
    
    // 标签管理
    initTagManagement();
    
    // 初始化图片预览
    initImagePreview();
});

/**
 * 导航栏滚动效果
 */
function initNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    if (!navbar) return;
    
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 50) {
            navbar.classList.add('navbar-scrolled');
        } else {
            navbar.classList.remove('navbar-scrolled');
        }
        
        // 处理导航栏显示/隐藏
        if (scrollTop > lastScrollTop && scrollTop > 100) {
            navbar.style.transform = 'translateY(-100%)';
        } else {
            navbar.style.transform = 'translateY(0)';
        }
        
        lastScrollTop = scrollTop;
    });
}

/**
 * 移动端菜单切换
 */
function initMobileMenu() {
    const menuToggle = document.querySelector('.menu-toggle');
    const mobileMenu = document.querySelector('.mobile-menu');
    
    if (!menuToggle || !mobileMenu) return;
    
    menuToggle.addEventListener('click', function() {
        this.classList.toggle('active');
        mobileMenu.classList.toggle('active');
        document.body.classList.toggle('overflow-hidden');
    });
    
    // 点击菜单项关闭菜单
    const menuLinks = mobileMenu.querySelectorAll('a');
    menuLinks.forEach(link => {
        link.addEventListener('click', function() {
            menuToggle.classList.remove('active');
            mobileMenu.classList.remove('active');
            document.body.classList.remove('overflow-hidden');
        });
    });
}

/**
 * 平滑滚动
 */
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const navbarHeight = document.querySelector('.navbar')?.offsetHeight || 0;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navbarHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

/**
 * 悬浮按钮动画
 */
function initFloatingButton() {
    const floatingButton = document.querySelector('.floating-button');
    if (!floatingButton) return;
    
    let isVisible = false;
    
    // 初始状态隐藏
    floatingButton.style.opacity = '0';
    floatingButton.style.transform = 'translateY(20px)';
    
    window.addEventListener('scroll', function() {
        const scrollY = window.pageYOffset;
        
        if (scrollY > 500 && !isVisible) {
            // 显示按钮
            floatingButton.style.opacity = '1';
            floatingButton.style.transform = 'translateY(0)';
            floatingButton.style.transition = 'opacity 300ms ease, transform 300ms ease';
            isVisible = true;
        } else if (scrollY <= 500 && isVisible) {
            // 隐藏按钮
            floatingButton.style.opacity = '0';
            floatingButton.style.transform = 'translateY(20px)';
            isVisible = false;
        }
    });
    
    // 添加点击效果
    floatingButton.addEventListener('mousedown', function() {
        this.style.transform = 'translateY(0) scale(0.95)';
    });
    
    floatingButton.addEventListener('mouseup', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
    
    floatingButton.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
}

/**
 * 图片懒加载
 */
function initLazyLoad() {
    const lazyImages = document.querySelectorAll('img[data-src]');
    if (lazyImages.length === 0) return;
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.onload = () => {
                    img.classList.add('loaded');
                };
                observer.unobserve(img);
            }
        });
    });
    
    lazyImages.forEach(img => {
        imageObserver.observe(img);
    });
}

/**
 * 输入框焦点效果
 */
function initInputFocus() {
    const inputs = document.querySelectorAll('input, textarea');
    inputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
        });
        
        input.addEventListener('blur', function() {
            this.parentElement.classList.remove('focused');
        });
    });
}

/**
 * 下拉菜单功能
 */
function initDropdownMenus() {
    const dropdownToggles = document.querySelectorAll('.dropdown-toggle');
    dropdownToggles.forEach(toggle => {
        toggle.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            // 关闭其他所有下拉菜单
            document.querySelectorAll('.dropdown-menu').forEach(menu => {
                if (menu !== this.nextElementSibling) {
                    menu.classList.remove('show');
                }
            });
            
            // 切换当前下拉菜单
            const dropdownMenu = this.nextElementSibling;
            if (dropdownMenu && dropdownMenu.classList.contains('dropdown-menu')) {
                dropdownMenu.classList.toggle('show');
            }
        });
    });
    
    // 点击外部关闭下拉菜单
    document.addEventListener('click', function() {
        document.querySelectorAll('.dropdown-menu.show').forEach(menu => {
            menu.classList.remove('show');
        });
    });
    
    // 阻止下拉菜单内部点击事件冒泡
    document.querySelectorAll('.dropdown-menu').forEach(menu => {
        menu.addEventListener('click', function(e) {
            e.stopPropagation();
        });
    });
}

/**
 * 搜索建议功能
 */
function initSearchSuggestions() {
    const searchInput = document.getElementById('search-input');
    const searchSuggestions = document.getElementById('search-suggestions');
    const searchForm = document.getElementById('search-form');
    
    if (!searchInput || !searchSuggestions || !searchForm) return;
    
    // 模拟搜索建议数据
    const suggestions = [
        { type: 'post', text: '2024年最值得去的十大旅行目的地' },
        { type: 'post', text: '一个人背包旅行的实用技巧' },
        { type: 'post', text: '成都必吃美食攻略' },
        { type: 'post', text: '户外旅行必备装备清单' },
        { type: 'user', text: '旅行达人小明' },
        { type: 'user', text: '摄影爱好者小红' },
        { type: 'user', text: '美食探险家' },
        { type: 'tag', text: '国内旅行' },
        { type: 'tag', text: '自驾游' },
        { type: 'tag', text: '徒步' },
        { type: 'tag', text: '摄影' },
        { type: 'tag', text: '美食' }
    ];
    
    // 搜索输入事件
    searchInput.addEventListener('input', debounce(function() {
        const query = this.value.trim().toLowerCase();
        
        if (query.length < 2) {
            searchSuggestions.innerHTML = '';
            searchSuggestions.classList.add('hidden');
            return;
        }
        
        // 过滤匹配的建议
        const filteredSuggestions = suggestions.filter(item => 
            item.text.toLowerCase().includes(query)
        );
        
        // 渲染建议列表
        if (filteredSuggestions.length > 0) {
            searchSuggestions.innerHTML = filteredSuggestions.map(item => {
                let icon = 'fa-file-alt';
                if (item.type === 'user') icon = 'fa-user';
                if (item.type === 'tag') icon = 'fa-hashtag';
                
                return `
                    <div class="search-suggestion-item">
                        <i class="icon fas ${icon}"></i>
                        <span>${item.text}</span>
                    </div>
                `;
            }).join('');
            
            searchSuggestions.classList.remove('hidden');
            
            // 为每个建议项添加点击事件
            const suggestionItems = searchSuggestions.querySelectorAll('.search-suggestion-item');
            suggestionItems.forEach((item, index) => {
                item.addEventListener('click', function() {
                    searchInput.value = filteredSuggestions[index].text;
                    searchSuggestions.classList.add('hidden');
                    searchForm.submit();
                });
            });
        } else {
            searchSuggestions.innerHTML = '<div class="search-suggestion-item">没有找到相关内容</div>';
            searchSuggestions.classList.remove('hidden');
        }
    }, 300));
    
    // 搜索框焦点事件
    searchInput.addEventListener('focus', function() {
        if (this.value.trim().length >= 2 && !searchSuggestions.classList.contains('hidden')) {
            searchSuggestions.classList.remove('hidden');
        }
    });
    
    // 点击外部关闭建议
    document.addEventListener('click', function(e) {
        if (!searchInput.contains(e.target) && !searchSuggestions.contains(e.target)) {
            searchSuggestions.classList.add('hidden');
        }
    });
    
    // 表单提交处理
    searchForm.addEventListener('submit', function(e) {
        if (!searchInput.value.trim()) {
            e.preventDefault();
            showNotification('请输入搜索内容', 'warning');
        }
    });
}

/**
 * 帖子交互功能
 */
function initPostInteractions() {
    // 点赞功能
    const likeButtons = document.querySelectorAll('.like-btn');
    likeButtons.forEach(button => {
        button.addEventListener('click', function() {
            const likeCountElement = this.querySelector('.like-count');
            const likeIcon = this.querySelector('i');
            let likeCount = parseInt(likeCountElement.textContent);
            
            if (this.classList.contains('liked')) {
                // 取消点赞
                likeCount--;
                this.classList.remove('liked');
                likeIcon.classList.remove('fas', 'fa-heart');
                likeIcon.classList.add('far', 'fa-heart');
            } else {
                // 点赞
                likeCount++;
                this.classList.add('liked');
                likeIcon.classList.remove('far', 'fa-heart');
                likeIcon.classList.add('fas', 'fa-heart');
                
                // 添加点赞动画
                likeIcon.classList.add('animate-bounce');
                setTimeout(() => {
                    likeIcon.classList.remove('animate-bounce');
                }, 1000);
                
                showNotification('点赞成功', 'success', 2000);
            }
            
            likeCountElement.textContent = likeCount;
        });
    });
    
    // 收藏功能
    const bookmarkButtons = document.querySelectorAll('.bookmark-btn');
    bookmarkButtons.forEach(button => {
        button.addEventListener('click', function() {
            const bookmarkIcon = this.querySelector('i');
            
            if (this.classList.contains('bookmarked')) {
                // 取消收藏
                this.classList.remove('bookmarked');
                bookmarkIcon.classList.remove('fas', 'fa-bookmark');
                bookmarkIcon.classList.add('far', 'fa-bookmark');
                showNotification('已取消收藏', 'info', 2000);
            } else {
                // 收藏
                this.classList.add('bookmarked');
                bookmarkIcon.classList.remove('far', 'fa-bookmark');
                bookmarkIcon.classList.add('fas', 'fa-bookmark');
                showNotification('收藏成功', 'success', 2000);
            }
        });
    });
    
    // 发布帖子按钮
    const createPostButtons = document.querySelectorAll('.create-post-btn, .floating-btn');
    createPostButtons.forEach(button => {
        button.addEventListener('click', function() {
            window.location.href = 'create-post.html';
        });
    });
}

/**
 * 表单验证
 */
function initFormValidation() {
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            // 获取所有必填字段
            const requiredFields = this.querySelectorAll('[required]');
            let isValid = true;
            
            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    isValid = false;
                    field.classList.add('error');
                    
                    // 添加错误提示
                    if (!field.nextElementSibling || !field.nextElementSibling.classList.contains('error-message')) {
                        const errorMessage = document.createElement('div');
                        errorMessage.classList.add('error-message');
                        errorMessage.textContent = '此字段为必填项';
                        field.parentNode.insertBefore(errorMessage, field.nextSibling);
                    }
                } else {
                    field.classList.remove('error');
                    
                    // 移除错误提示
                    const errorMessage = field.nextElementSibling;
                    if (errorMessage && errorMessage.classList.contains('error-message')) {
                        errorMessage.remove();
                    }
                    
                    // 邮箱验证
                    if (field.type === 'email') {
                        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                        if (!emailRegex.test(field.value)) {
                            isValid = false;
                            field.classList.add('error');
                            
                            if (!field.nextElementSibling || !field.nextElementSibling.classList.contains('error-message')) {
                                const errorMessage = document.createElement('div');
                                errorMessage.classList.add('error-message');
                                errorMessage.textContent = '请输入有效的邮箱地址';
                                field.parentNode.insertBefore(errorMessage, field.nextSibling);
                            }
                        }
                    }
                }
            });
            
            // 密码匹配验证
            const passwordFields = this.querySelectorAll('input[type="password"]');
            if (passwordFields.length === 2) {
                const password = passwordFields[0].value;
                const confirmPassword = passwordFields[1].value;
                
                if (password !== confirmPassword) {
                    isValid = false;
                    passwordFields[1].classList.add('error');
                    
                    if (!passwordFields[1].nextElementSibling || !passwordFields[1].nextElementSibling.classList.contains('error-message')) {
                        const errorMessage = document.createElement('div');
                        errorMessage.classList.add('error-message');
                        errorMessage.textContent = '两次输入的密码不一致';
                        passwordFields[1].parentNode.insertBefore(errorMessage, passwordFields[1].nextSibling);
                    }
                }
            }
            
            if (!isValid) {
                e.preventDefault();
                
                // 滚动到第一个错误字段
                const firstErrorField = this.querySelector('.error');
                if (firstErrorField) {
                    firstErrorField.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    firstErrorField.focus();
                }
            }
        });
        
        // 输入时清除错误状态
        const formInputs = form.querySelectorAll('input, textarea');
        formInputs.forEach(input => {
            input.addEventListener('input', function() {
                this.classList.remove('error');
                
                const errorMessage = this.nextElementSibling;
                if (errorMessage && errorMessage.classList.contains('error-message')) {
                    errorMessage.remove();
                }
            });
        });
    });
}

/**
 * 通知提示函数
 * @param {string} message - 提示消息
 * @param {string} type - 消息类型: success, error, warning, info
 * @param {number} duration - 显示时长(毫秒)
 */
window.showNotification = function(message, type = 'info', duration = 3000) {
    // 移除之前的通知
    const oldNotifications = document.querySelectorAll('.notification');
    oldNotifications.forEach(notification => notification.remove());
    
    // 创建通知元素
    const notification = document.createElement('div');
    notification.className = 'notification';
    
    // 根据类型设置样式
    let iconClass = 'fa-info-circle';
    let bgColor = 'bg-blue-500';
    
    if (type === 'success') {
        iconClass = 'fa-check-circle';
        bgColor = 'bg-green-500';
    } else if (type === 'error') {
        iconClass = 'fa-exclamation-circle';
        bgColor = 'bg-red-500';
    } else if (type === 'warning') {
        iconClass = 'fa-exclamation-triangle';
        bgColor = 'bg-yellow-500';
    }
    
    notification.classList.add(bgColor, 'text-white', 'shadow-lg', 'py-3', 'px-4', 'rounded-lg', 'flex', 'items-center', 'max-w-md', 'transition-all', 'duration-300', 'fixed', 'top-4', 'right-4', 'z-50', 'transform', 'translate-x-full');
    notification.innerHTML = `
        <i class="fas ${iconClass} mr-3"></i>
        <span>${message}</span>
        <button class="notification-close ml-auto text-white hover:opacity-80 focus:outline-none">
            <i class="fas fa-times"></i>
        </button>
    `;
    
    // 添加到页面
    document.body.appendChild(notification);
    
    // 使用requestAnimationFrame确保平滑过渡
    requestAnimationFrame(() => {
        requestAnimationFrame(() => {
            notification.style.transform = 'translateX(0)';
        });
    });
    
    // 关闭按钮事件
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', function() {
        closeNotification(notification);
    });
    
    // 自动关闭
    setTimeout(() => {
        closeNotification(notification);
    }, duration);
};

/**
 * 关闭通知的辅助函数
 * @param {HTMLElement} notification - 要关闭的通知元素
 */
function closeNotification(notification) {
    notification.style.transform = 'translateX(calc(100% + 1rem))';
    setTimeout(() => {
        notification.remove();
    }, 300);
}

/**
 * 初始化页面加载动画
 */
function initPageLoader() {
    const loader = document.getElementById('loader');
    if (loader) {
        // 页面加载完成后延迟隐藏加载动画
        setTimeout(() => {
            loader.classList.add('hidden');
            // 为页面内容添加淡入效果
            document.body.classList.remove('opacity-0');
        }, 600);
    }
}

/**
 * 加载动画函数
 * @param {HTMLElement} element - 要添加加载动画的元素
 * @param {boolean} show - 是否显示加载动画
 * @param {string} text - 加载提示文本
 */
function showLoader(element, show = true, text = '加载中...') {
    if (!element) return;
    
    if (show) {
        // 保存原始内容和样式
        if (!element.dataset.originalContent) {
            element.dataset.originalContent = element.innerHTML;
            element.dataset.originalPointerEvents = element.style.pointerEvents;
        }
        
        // 添加加载器
        element.innerHTML = `
            <div class="loader-container flex flex-col items-center justify-center py-8 min-h-[100px]">
                <div class="loader w-8 h-8 border-4 border-pink-200 border-t-pink-500 rounded-full animate-spin mb-3"></div>
                <div class="loader-text text-gray-500 text-sm">${text}</div>
            </div>
        `;
        
        // 禁用元素
        element.style.pointerEvents = 'none';
    } else {
        // 恢复原始内容和样式
        if (element.dataset.originalContent) {
            element.innerHTML = element.dataset.originalContent;
            element.style.pointerEvents = element.dataset.originalPointerEvents || '';
            delete element.dataset.originalContent;
            delete element.dataset.originalPointerEvents;
        }
    }
}

/**
 * 防抖函数
 * @param {Function} func - 要执行的函数
 * @param {number} wait - 延迟时间(毫秒)
 * @returns {Function} 防抖处理后的函数
 */
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

/**
 * 节流函数
 * @param {Function} func - 要执行的函数
 * @param {number} limit - 时间限制(毫秒)
 * @returns {Function} 节流处理后的函数
 */
function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

/**
 * 复制文本到剪贴板
 * @param {string} text - 要复制的文本
 * @returns {Promise<boolean>} 是否复制成功
 */
async function copyToClipboard(text) {
    try {
        if (navigator.clipboard && window.isSecureContext) {
            // 使用现代 API
            await navigator.clipboard.writeText(text);
            return true;
        } else {
            // 降级方案
            const textArea = document.createElement('textarea');
            textArea.value = text;
            textArea.style.position = 'fixed';
            textArea.style.left = '-999999px';
            textArea.style.top = '-999999px';
            document.body.appendChild(textArea);
            textArea.focus();
            textArea.select();
            
            try {
                const successful = document.execCommand('copy');
                return successful;
            } catch (fallbackErr) {
                console.error('复制失败:', fallbackErr);
                return false;
            } finally {
                document.body.removeChild(textArea);
            }
        }
    } catch (err) {
        console.error('复制失败:', err);
        return false;
    }
}

/**
 * 初始化工具提示
 */
function initTooltips() {
    // 为带有data-tooltip属性的元素添加工具提示
    const tooltipElements = document.querySelectorAll('[data-tooltip]');
    
    tooltipElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
            const tooltipText = element.getAttribute('data-tooltip');
            if (!tooltipText) return;
            
            // 创建工具提示元素
            const tooltip = document.createElement('div');
            tooltip.className = 'absolute px-2 py-1 bg-gray-800 text-white text-xs rounded whitespace-nowrap z-50 shadow-lg opacity-0 transition-opacity duration-200';
            tooltip.textContent = tooltipText;
            tooltip.id = 'temp-tooltip';
            
            // 添加到文档中
            document.body.appendChild(tooltip);
            
            // 计算位置
            const rect = element.getBoundingClientRect();
            tooltip.style.left = `${rect.left + rect.width / 2}px`;
            tooltip.style.top = `${rect.top - tooltip.offsetHeight - 5}px`;
            tooltip.style.transform = 'translateX(-50%)';
            
            // 淡入效果
            setTimeout(() => {
                tooltip.classList.remove('opacity-0');
            }, 50);
        });
        
        element.addEventListener('mouseleave', () => {
            const tooltip = document.getElementById('temp-tooltip');
            if (tooltip) {
                tooltip.classList.add('opacity-0');
                setTimeout(() => tooltip.remove(), 200);
            }
        });
    });
}

/**
 * 初始化标签管理
 */
function initTagManagement() {
    // 查找所有标签容器和输入框
    const tagContainers = document.querySelectorAll('.tag-container');
    
    tagContainers.forEach(container => {
        const input = container.querySelector('input.tag-input');
        
        if (!input) return;
        
        // 输入框回车添加标签
        input.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' && input.value.trim()) {
                e.preventDefault();
                addTag(input.value.trim(), container, input);
                input.value = '';
            }
        });
        
        // 处理标签删除
        container.addEventListener('click', (e) => {
            if (e.target.classList.contains('remove-tag')) {
                const tagElement = e.target.closest('.tag');
                if (tagElement) {
                    // 添加删除动画
                    tagElement.classList.add('opacity-0', 'scale-95');
                    setTimeout(() => {
                        tagElement.remove();
                    }, 200);
                }
            }
        });
    });
}

/**
 * 添加标签
 * @param {string} text - 标签文本
 * @param {HTMLElement} container - 标签容器
 * @param {HTMLInputElement} input - 输入框
 */
function addTag(text, container, input) {
    // 检查标签是否已存在
    const existingTags = container.querySelectorAll('.tag span');
    for (const tag of existingTags) {
        if (tag.textContent.toLowerCase() === text.toLowerCase()) {
            showNotification('该标签已存在', 'warning');
            return;
        }
    }
    
    // 限制最大标签数量
    if (existingTags.length >= 5) {
        showNotification('最多添加5个标签', 'warning');
        return;
    }
    
    // 创建标签元素
    const tagElement = document.createElement('div');
    tagElement.className = 'tag inline-flex items-center bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-sm mr-2 mb-2 opacity-0 scale-95 transition-all duration-200';
    tagElement.innerHTML = `
        <span>${text}</span>
        <button type="button" class="remove-tag ml-1 text-gray-400 hover:text-gray-600 focus:outline-none">
            <i class="fas fa-times-circle"></i>
        </button>
    `;
    
    // 插入到输入框前面
    container.insertBefore(tagElement, input);
    
    // 添加淡入动画
    setTimeout(() => {
        tagElement.classList.remove('opacity-0', 'scale-95');
    }, 10);
}

/**
 * 初始化图片预览
 */
function initImagePreview() {
    // 查找所有图片上传区域
    const uploadAreas = document.querySelectorAll('.image-upload-area');
    
    uploadAreas.forEach(area => {
        const input = area.querySelector('input[type="file"]');
        const previewContainer = area.querySelector('.preview-container');
        
        if (!input || !previewContainer) return;
        
        // 监听文件选择
        input.addEventListener('change', (e) => {
            const files = e.target.files;
            if (files && files.length > 0) {
                // 显示加载动画
                showLoader(previewContainer, true, '处理图片中...');
                
                // 使用setTimeout模拟处理延迟
                setTimeout(() => {
                    // 隐藏加载动画
                    showLoader(previewContainer, false);
                    
                    // 预览图片
                    for (let i = 0; i < files.length; i++) {
                        const file = files[i];
                        if (file.type.startsWith('image/')) {
                            const reader = new FileReader();
                            
                            reader.onload = (event) => {
                                // 创建预览元素
                                const previewItem = document.createElement('div');
                                previewItem.className = 'preview-item relative mr-3 mb-3';
                                previewItem.innerHTML = `
                                    <img src="${event.target.result}" alt="预览图" class="preview-img w-24 h-24 object-cover rounded-md border border-gray-200" />
                                    <button type="button" class="remove-preview absolute top-1 right-1 bg-white bg-opacity-70 rounded-full p-1 hover:bg-opacity-100 transition-colors">
                                        <i class="fas fa-times text-gray-600"></i>
                                    </button>
                                `;
                                
                                previewContainer.appendChild(previewItem);
                                
                                // 添加删除预览图片功能
                                previewItem.querySelector('.remove-preview').addEventListener('click', () => {
                                    previewItem.remove();
                                });
                            };
                            
                            reader.readAsDataURL(file);
                        }
                    }
                }, 500);
            }
        });
    });
}

/**
 * 获取相对时间（例如：3分钟前）
 * @param {Date|string|number} date - 日期
 * @returns {string} - 相对时间字符串
 */
function getRelativeTime(date) {
    const now = new Date();
    const past = new Date(date);
    const diffInSeconds = Math.floor((now - past) / 1000);
    
    if (diffInSeconds < 60) return '刚刚';
    
    const diffInMinutes = Math.floor(diffInSeconds / 60);
    if (diffInMinutes < 60) return `${diffInMinutes}分钟前`;
    
    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) return `${diffInHours}小时前`;
    
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 30) return `${diffInDays}天前`;
    
    const diffInMonths = Math.floor(diffInDays / 30);
    if (diffInMonths < 12) return `${diffInMonths}个月前`;
    
    return `${Math.floor(diffInMonths / 12)}年前`;
}