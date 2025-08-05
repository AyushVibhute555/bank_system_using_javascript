// Banking & ATM Management System
class BankingSystem {
    constructor() {
        this.currentUser = null;
        this.users = [
            {
                id: 1,
                username: "john_doe",
                password: "password123",
                email: "john@example.com",
                role: "CUSTOMER",
                firstName: "John",
                lastName: "Doe",
                phone: "+1-555-0123"
            },
            {
                id: 2,
                username: "admin",
                password: "admin123",
                email: "admin@bank.com",
                role: "ADMIN",
                firstName: "Admin",
                lastName: "User",
                phone: "+1-555-0100"
            }
        ];
        
        this.accounts = [
            {
                id: 1,
                accountNumber: "ACC001234567",
                userId: 1,
                accountType: "SAVINGS",
                balance: 15000.50,
                status: "ACTIVE"
            },
            {
                id: 2,
                accountNumber: "ACC001234568",
                userId: 1,
                accountType: "CHECKING",
                balance: 5000.00,
                status: "ACTIVE"
            }
        ];
        
        this.transactions = [
            {
                id: 1,
                transactionId: "TXN001",
                accountId: 1,
                type: "DEPOSIT",
                amount: 1000.00,
                balanceAfter: 15000.50,
                description: "Cash deposit",
                status: "COMPLETED",
                date: "2025-01-01T10:00:00Z"
            },
            {
                id: 2,
                transactionId: "TXN002",
                accountId: 1,
                type: "WITHDRAWAL",
                amount: 500.00,
                balanceAfter: 14500.50,
                description: "ATM withdrawal",
                status: "COMPLETED",
                date: "2025-01-02T14:30:00Z"
            }
        ];
        
        this.atmLocations = [
            {
                id: 1,
                name: "Main Branch ATM",
                address: "123 Main St, City Center",
                status: "ACTIVE",
                services: ["Cash Withdrawal", "Balance Inquiry", "Mini Statement"]
            },
            {
                id: 2,
                name: "Mall ATM",
                address: "456 Shopping Mall, Downtown",
                status: "ACTIVE",
                services: ["Cash Withdrawal", "Balance Inquiry"]
            }
        ];
        
        // Wait for DOM to be fully loaded before initializing
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.init());
        } else {
            this.init();
        }
    }
    
    init() {
        console.log('Initializing Banking System...');
        this.bindEvents();
        this.showLoadingScreen();
        
        // Simulate loading time
        setTimeout(() => {
            console.log('Loading complete, showing login page...');
            this.hideLoadingScreen();
            this.showLoginPage();
        }, 2000);
    }
    
    showLoadingScreen() {
        const loadingScreen = document.getElementById('loading-screen');
        const loginPage = document.getElementById('login-page');
        const registerPage = document.getElementById('register-page');
        const mainApp = document.getElementById('main-app');
        
        if (loadingScreen) loadingScreen.classList.remove('hidden');
        if (loginPage) loginPage.classList.add('hidden');
        if (registerPage) registerPage.classList.add('hidden');
        if (mainApp) mainApp.classList.add('hidden');
    }
    
    hideLoadingScreen() {
        const loadingScreen = document.getElementById('loading-screen');
        if (loadingScreen) {
            loadingScreen.classList.add('hidden');
        }
    }
    
    showLoginPage() {
        const loginPage = document.getElementById('login-page');
        const registerPage = document.getElementById('register-page');
        const mainApp = document.getElementById('main-app');
        
        if (loginPage) loginPage.classList.remove('hidden');
        if (registerPage) registerPage.classList.add('hidden');
        if (mainApp) mainApp.classList.add('hidden');
        
        // Clear any form data
        const loginForm = document.getElementById('login-form');
        if (loginForm) loginForm.reset();
    }
    
    showRegisterPage() {
        const registerPage = document.getElementById('register-page');
        const loginPage = document.getElementById('login-page');
        const mainApp = document.getElementById('main-app');
        
        if (registerPage) registerPage.classList.remove('hidden');
        if (loginPage) loginPage.classList.add('hidden');
        if (mainApp) mainApp.classList.add('hidden');
        
        // Clear any form data
        const registerForm = document.getElementById('register-form');
        if (registerForm) registerForm.reset();
    }
    
    showMainApp() {
        const mainApp = document.getElementById('main-app');
        const loginPage = document.getElementById('login-page');
        const registerPage = document.getElementById('register-page');
        
        if (mainApp) mainApp.classList.remove('hidden');
        if (loginPage) loginPage.classList.add('hidden');
        if (registerPage) registerPage.classList.add('hidden');
        
        this.updateUserWelcome();
        this.showAdminNav();
        this.loadDashboard();
    }
    
    bindEvents() {
        // Auth events
        const showRegisterBtn = document.getElementById('show-register');
        const showLoginBtn = document.getElementById('show-login');
        const loginForm = document.getElementById('login-form');
        const registerForm = document.getElementById('register-form');
        const logoutBtn = document.getElementById('logout-btn');
        
        if (showRegisterBtn) {
            showRegisterBtn.addEventListener('click', (e) => {
                e.preventDefault();
                this.showRegisterPage();
            });
        }
        
        if (showLoginBtn) {
            showLoginBtn.addEventListener('click', (e) => {
                e.preventDefault();
                this.showLoginPage();
            });
        }
        
        if (loginForm) {
            loginForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleLogin();
            });
        }
        
        if (registerForm) {
            registerForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleRegister();
            });
        }
        
        if (logoutBtn) {
            logoutBtn.addEventListener('click', () => {
                this.handleLogout();
            });
        }
        
        // Navigation events
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const page = e.target.dataset.page;
                if (page) {
                    this.navigateToPage(page);
                }
            });
        });
        
        // Quick action buttons
        document.querySelectorAll('.action-buttons .btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const page = e.target.dataset.page;
                if (page) {
                    this.navigateToPage(page);
                }
            });
        });
        
        // Transfer form
        const transferForm = document.getElementById('transfer-form');
        if (transferForm) {
            transferForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleTransfer();
            });
        }
        
        // ATM actions
        document.querySelectorAll('.atm-action').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const action = e.target.dataset.action;
                this.handleATMAction(action);
            });
        });
        
        // ATM withdrawal form
        const atmWithdrawalForm = document.getElementById('atm-withdrawal-form');
        if (atmWithdrawalForm) {
            atmWithdrawalForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleATMWithdrawal();
            });
        }
        
        // Filter events
        const filterAccount = document.getElementById('filter-account');
        const filterType = document.getElementById('filter-type');
        
        if (filterAccount) {
            filterAccount.addEventListener('change', () => {
                this.loadTransactions();
            });
        }
        
        if (filterType) {
            filterType.addEventListener('change', () => {
                this.loadTransactions();
            });
        }
        
        // Modal events
        document.querySelectorAll('.modal-close').forEach(btn => {
            btn.addEventListener('click', () => {
                this.closeModals();
            });
        });
        
        // Notification close
        const notificationClose = document.getElementById('notification-close');
        if (notificationClose) {
            notificationClose.addEventListener('click', () => {
                this.hideNotification();
            });
        }
        
        // Click outside modal to close
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('modal')) {
                this.closeModals();
            }
        });
    }
    
    async handleLogin() {
        const usernameInput = document.getElementById('login-username');
        const passwordInput = document.getElementById('login-password');
        
        if (!usernameInput || !passwordInput) {
            this.showNotification('Login form not found', 'error');
            return;
        }
        
        const username = usernameInput.value.trim();
        const password = passwordInput.value.trim();
        
        if (!username || !password) {
            this.showNotification('Please enter username and password', 'error');
            return;
        }
        
        // Simulate API call
        await this.delay(1000);
        
        const user = this.users.find(u => u.username === username && u.password === password);
        
        if (user) {
            this.currentUser = user;
            this.showNotification('Login successful!', 'success');
            this.showMainApp();
        } else {
            this.showNotification('Invalid username or password', 'error');
        }
    }
    
    async handleRegister() {
        const formData = {
            firstName: document.getElementById('register-firstname').value.trim(),
            lastName: document.getElementById('register-lastname').value.trim(),
            username: document.getElementById('register-username').value.trim(),
            email: document.getElementById('register-email').value.trim(),
            phone: document.getElementById('register-phone').value.trim(),
            password: document.getElementById('register-password').value.trim()
        };
        
        // Validate required fields
        if (!formData.firstName || !formData.lastName || !formData.username || 
            !formData.email || !formData.phone || !formData.password) {
            this.showNotification('Please fill all required fields', 'error');
            return;
        }
        
        // Check if username already exists
        if (this.users.find(u => u.username === formData.username)) {
            this.showNotification('Username already exists', 'error');
            return;
        }
        
        // Simulate API call
        await this.delay(1000);
        
        const newUser = {
            id: this.users.length + 1,
            ...formData,
            role: "CUSTOMER"
        };
        
        this.users.push(newUser);
        
        // Create default accounts for new user
        const savingsAccount = {
            id: this.accounts.length + 1,
            accountNumber: `ACC00${1000000 + newUser.id}`,
            userId: newUser.id,
            accountType: "SAVINGS",
            balance: 1000.00,
            status: "ACTIVE"
        };
        
        this.accounts.push(savingsAccount);
        
        this.showNotification('Account created successfully! You can now login.', 'success');
        this.showLoginPage();
    }
    
    handleLogout() {
        this.currentUser = null;
        this.showNotification('Logged out successfully', 'success');
        this.showLoginPage();
    }
    
    navigateToPage(page) {
        if (!this.currentUser) {
            this.showNotification('Please login first', 'error');
            return;
        }
        
        // Update navigation
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
        });
        
        const activeLink = document.querySelector(`[data-page="${page}"]`);
        if (activeLink) {
            activeLink.classList.add('active');
        }
        
        // Show page
        document.querySelectorAll('.page').forEach(p => {
            p.classList.remove('active');
            p.classList.add('hidden');
        });
        
        const targetPage = document.getElementById(`${page}-page`);
        if (targetPage) {
            targetPage.classList.remove('hidden');
            targetPage.classList.add('active');
        }
        
        // Load page data
        switch(page) {
            case 'dashboard':
                this.loadDashboard();
                break;
            case 'accounts':
                this.loadAccounts();
                break;
            case 'transfer':
                this.loadTransferPage();
                break;
            case 'transactions':
                this.loadTransactions();
                break;
            case 'atm':
                this.loadATMPage();
                break;
            case 'admin':
                this.loadAdminPanel();
                break;
        }
    }
    
    loadDashboard() {
        const userAccounts = this.getUserAccounts();
        const accountCardsContainer = document.getElementById('account-cards');
        
        if (accountCardsContainer) {
            accountCardsContainer.innerHTML = userAccounts.map(account => `
                <div class="account-card">
                    <h4>${account.accountType} Account</h4>
                    <p class="account-number">${account.accountNumber}</p>
                    <p class="account-balance">$${account.balance.toLocaleString()}</p>
                    <span class="account-type">${account.status}</span>
                </div>
            `).join('');
        }
        
        this.loadRecentTransactions();
    }
    
    loadRecentTransactions() {
        const userAccounts = this.getUserAccounts();
        const accountIds = userAccounts.map(acc => acc.id);
        const recentTransactions = this.transactions
            .filter(t => accountIds.includes(t.accountId))
            .sort((a, b) => new Date(b.date) - new Date(a.date))
            .slice(0, 5);
        
        const container = document.getElementById('recent-transactions-list');
        
        if (!container) return;
        
        if (recentTransactions.length === 0) {
            container.innerHTML = '<p class="text-center">No recent transactions</p>';
            return;
        }
        
        container.innerHTML = recentTransactions.map(transaction => `
            <div class="transaction-item" onclick="bankingSystem.showTransactionDetails('${transaction.transactionId}')">
                <div class="transaction-info">
                    <h4>${transaction.description}</h4>
                    <p>${new Date(transaction.date).toLocaleDateString()}</p>
                </div>
                <div class="transaction-amount ${transaction.type === 'DEPOSIT' ? 'positive' : 'negative'}">
                    ${transaction.type === 'DEPOSIT' ? '+' : '-'}$${transaction.amount.toLocaleString()}
                </div>
                <div class="transaction-status">
                    <span class="status status--success">${transaction.status}</span>
                </div>
            </div>
        `).join('');
    }
    
    loadAccounts() {
        const userAccounts = this.getUserAccounts();
        const container = document.getElementById('accounts-list');
        
        if (!container) return;
        
        container.innerHTML = userAccounts.map(account => `
            <div class="account-detail-card">
                <h3>${account.accountType} Account</h3>
                <div class="account-info">
                    <div class="info-row">
                        <span class="info-label">Account Number</span>
                        <span class="info-value">${account.accountNumber}</span>
                    </div>
                    <div class="info-row">
                        <span class="info-label">Balance</span>
                        <span class="info-value font-bold">$${account.balance.toLocaleString()}</span>
                    </div>
                    <div class="info-row">
                        <span class="info-label">Status</span>
                        <span class="info-value">
                            <span class="status status--success">${account.status}</span>
                        </span>
                    </div>
                    <div class="info-row">
                        <span class="info-label">Account Type</span>
                        <span class="info-value">${account.accountType}</span>
                    </div>
                </div>
            </div>
        `).join('');
    }
    
    loadTransferPage() {
        const userAccounts = this.getUserAccounts();
        const fromAccountSelect = document.getElementById('from-account');
        
        if (!fromAccountSelect) return;
        
        fromAccountSelect.innerHTML = '<option value="">Select account</option>' +
            userAccounts.map(account => `
                <option value="${account.id}">${account.accountType} - ${account.accountNumber} ($${account.balance.toLocaleString()})</option>
            `).join('');
    }
    
    async handleTransfer() {
        const fromAccountId = parseInt(document.getElementById('from-account').value);
        const toAccountNumber = document.getElementById('to-account').value.trim();
        const amount = parseFloat(document.getElementById('transfer-amount').value);
        const description = document.getElementById('transfer-description').value.trim() || 'Transfer';
        
        if (!fromAccountId || !toAccountNumber || !amount || amount <= 0) {
            this.showNotification('Please fill all required fields with valid values', 'error');
            return;
        }
        
        const fromAccount = this.accounts.find(acc => acc.id === fromAccountId);
        
        if (!fromAccount) {
            this.showNotification('Source account not found', 'error');
            return;
        }
        
        if (fromAccount.balance < amount) {
            this.showNotification('Insufficient balance', 'error');
            return;
        }
        
        // Simulate API call
        await this.delay(1500);
        
        // Update balance
        fromAccount.balance -= amount;
        
        // Create transaction
        const transaction = {
            id: this.transactions.length + 1,
            transactionId: `TXN${String(this.transactions.length + 1).padStart(3, '0')}`,
            accountId: fromAccountId,
            type: 'TRANSFER',
            amount: amount,
            balanceAfter: fromAccount.balance,
            description: `Transfer to ${toAccountNumber} - ${description}`,
            status: 'COMPLETED',
            date: new Date().toISOString()
        };
        
        this.transactions.push(transaction);
        
        this.showNotification('Transfer completed successfully!', 'success');
        document.getElementById('transfer-form').reset();
        this.loadTransferPage();
    }
    
    loadTransactions() {
        const userAccounts = this.getUserAccounts();
        const accountIds = userAccounts.map(acc => acc.id);
        
        // Populate filter dropdown
        const filterAccountSelect = document.getElementById('filter-account');
        if (filterAccountSelect) {
            filterAccountSelect.innerHTML = '<option value="">All accounts</option>' +
                userAccounts.map(account => `
                    <option value="${account.id}">${account.accountType} - ${account.accountNumber}</option>
                `).join('');
        }
        
        // Get filter values
        const selectedAccountId = document.getElementById('filter-account')?.value;
        const selectedType = document.getElementById('filter-type')?.value;
        
        // Filter transactions
        let filteredTransactions = this.transactions.filter(t => accountIds.includes(t.accountId));
        
        if (selectedAccountId) {
            filteredTransactions = filteredTransactions.filter(t => t.accountId === parseInt(selectedAccountId));
        }
        
        if (selectedType) {
            filteredTransactions = filteredTransactions.filter(t => t.type === selectedType);
        }
        
        // Sort by date (newest first)
        filteredTransactions.sort((a, b) => new Date(b.date) - new Date(a.date));
        
        const container = document.getElementById('transactions-list');
        
        if (!container) return;
        
        if (filteredTransactions.length === 0) {
            container.innerHTML = '<p class="text-center">No transactions found</p>';
            return;
        }
        
        container.innerHTML = filteredTransactions.map(transaction => `
            <div class="transaction-item" onclick="bankingSystem.showTransactionDetails('${transaction.transactionId}')">
                <div class="transaction-info">
                    <h4>${transaction.description}</h4>
                    <p>${new Date(transaction.date).toLocaleDateString()} at ${new Date(transaction.date).toLocaleTimeString()}</p>
                </div>
                <div class="transaction-amount ${transaction.type === 'DEPOSIT' ? 'positive' : 'negative'}">
                    ${transaction.type === 'DEPOSIT' ? '+' : '-'}$${transaction.amount.toLocaleString()}
                </div>
                <div class="transaction-status">
                    <span class="status status--success">${transaction.status}</span>
                </div>
            </div>
        `).join('');
    }
    
    loadATMPage() {
        const container = document.getElementById('atm-locations-list');
        
        if (container) {
            container.innerHTML = this.atmLocations.map(location => `
                <div class="atm-location">
                    <h4>${location.name}</h4>
                    <p>${location.address}</p>
                    <p><strong>Status:</strong> <span class="status status--success">${location.status}</span></p>
                    <div class="atm-services">
                        ${location.services.map(service => `<span class="service-tag">${service}</span>`).join('')}
                    </div>
                </div>
            `).join('');
        }
        
        // Populate withdrawal account dropdown
        const userAccounts = this.getUserAccounts();
        const withdrawalAccountSelect = document.getElementById('withdrawal-account');
        
        if (withdrawalAccountSelect) {
            withdrawalAccountSelect.innerHTML = '<option value="">Select account</option>' +
                userAccounts.map(account => `
                    <option value="${account.id}">${account.accountType} - ${account.accountNumber} ($${account.balance.toLocaleString()})</option>
                `).join('');
        }
    }
    
    handleATMAction(action) {
        switch(action) {
            case 'balance':
                this.showBalanceInquiry();
                break;
            case 'withdraw':
                this.showATMWithdrawalModal();
                break;
            case 'statement':
                this.showMiniStatement();
                break;
        }
    }
    
    showBalanceInquiry() {
        const userAccounts = this.getUserAccounts();
        const totalBalance = userAccounts.reduce((sum, acc) => sum + acc.balance, 0);
        
        const balanceDetails = userAccounts.map(acc => 
            `${acc.accountType}: $${acc.balance.toLocaleString()}`
        ).join('\\n');
        
        this.showNotification(`Total Balance: $${totalBalance.toLocaleString()}\\n\\n${balanceDetails}`, 'success');
    }
    
    showATMWithdrawalModal() {
        const modal = document.getElementById('atm-withdrawal-modal');
        if (modal) {
            modal.classList.remove('hidden');
        }
    }
    
    async handleATMWithdrawal() {
        const accountId = parseInt(document.getElementById('withdrawal-account').value);
        const amount = parseFloat(document.getElementById('withdrawal-amount').value);
        
        if (!accountId || !amount) {
            this.showNotification('Please select account and amount', 'error');
            return;
        }
        
        const account = this.accounts.find(acc => acc.id === accountId);
        
        if (!account) {
            this.showNotification('Please select an account', 'error');
            return;
        }
        
        if (account.balance < amount) {
            this.showNotification('Insufficient balance', 'error');
            return;
        }
        
        // Simulate ATM processing
        await this.delay(2000);
        
        // Update balance
        account.balance -= amount;
        
        // Create transaction
        const transaction = {
            id: this.transactions.length + 1,
            transactionId: `TXN${String(this.transactions.length + 1).padStart(3, '0')}`,
            accountId: accountId,
            type: 'WITHDRAWAL',
            amount: amount,
            balanceAfter: account.balance,
            description: 'ATM withdrawal',
            status: 'COMPLETED',
            date: new Date().toISOString()
        };
        
        this.transactions.push(transaction);
        
        this.closeModals();
        this.showNotification(`ATM Withdrawal successful! $${amount} dispensed.`, 'success');
        this.loadATMPage();
    }
    
    showMiniStatement() {
        const userAccounts = this.getUserAccounts();
        const accountIds = userAccounts.map(acc => acc.id);
        const recentTransactions = this.transactions
            .filter(t => accountIds.includes(t.accountId))
            .sort((a, b) => new Date(b.date) - new Date(a.date))
            .slice(0, 5);
        
        const statement = recentTransactions.map(t => 
            `${new Date(t.date).toLocaleDateString()} - ${t.description}: $${t.amount}`
        ).join('\\n');
        
        this.showNotification(`Mini Statement:\\n\\n${statement || 'No recent transactions'}`, 'success');
    }
    
    loadAdminPanel() {
        if (this.currentUser.role !== 'ADMIN') {
            this.showNotification('Access denied', 'error');
            this.navigateToPage('dashboard');
            return;
        }
        
        // Update stats
        const totalUsersEl = document.getElementById('total-users');
        const totalAccountsEl = document.getElementById('total-accounts');
        const totalTransactionsEl = document.getElementById('total-transactions');
        
        if (totalUsersEl) totalUsersEl.textContent = this.users.length;
        if (totalAccountsEl) totalAccountsEl.textContent = this.accounts.length;
        if (totalTransactionsEl) totalTransactionsEl.textContent = this.transactions.length;
        
        // Load users list
        const usersContainer = document.getElementById('users-list');
        if (usersContainer) {
            usersContainer.innerHTML = `
                <table class="admin-table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Username</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Role</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${this.users.map(user => `
                            <tr>
                                <td>${user.id}</td>
                                <td>${user.username}</td>
                                <td>${user.firstName} ${user.lastName}</td>
                                <td>${user.email}</td>
                                <td><span class="status status--info">${user.role}</span></td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            `;
        }
        
        // Load accounts list
        const accountsContainer = document.getElementById('admin-accounts-list');
        if (accountsContainer) {
            accountsContainer.innerHTML = `
                <table class="admin-table">
                    <thead>
                        <tr>
                            <th>Account Number</th>
                            <th>User</th>
                            <th>Type</th>
                            <th>Balance</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${this.accounts.map(account => {
                            const user = this.users.find(u => u.id === account.userId);
                            return `
                                <tr>
                                    <td>${account.accountNumber}</td>
                                    <td>${user ? user.firstName + ' ' + user.lastName : 'Unknown'}</td>
                                    <td>${account.accountType}</td>
                                    <td>$${account.balance.toLocaleString()}</td>
                                    <td><span class="status status--success">${account.status}</span></td>
                                </tr>
                            `;
                        }).join('')}
                    </tbody>
                </table>
            `;
        }
    }
    
    showTransactionDetails(transactionId) {
        const transaction = this.transactions.find(t => t.transactionId === transactionId);
        const account = this.accounts.find(a => a.id === transaction.accountId);
        
        if (!transaction) return;
        
        const details = `
            <div class="transaction-details">
                <div class="info-row">
                    <span class="info-label">Transaction ID</span>
                    <span class="info-value">${transaction.transactionId}</span>
                </div>
                <div class="info-row">
                    <span class="info-label">Account</span>
                    <span class="info-value">${account ? account.accountNumber : 'Unknown'}</span>
                </div>
                <div class="info-row">
                    <span class="info-label">Type</span>
                    <span class="info-value">${transaction.type}</span>
                </div>
                <div class="info-row">
                    <span class="info-label">Amount</span>
                    <span class="info-value font-bold">$${transaction.amount.toLocaleString()}</span>
                </div>
                <div class="info-row">
                    <span class="info-label">Description</span>
                    <span class="info-value">${transaction.description}</span>
                </div>
                <div class="info-row">
                    <span class="info-label">Date</span>
                    <span class="info-value">${new Date(transaction.date).toLocaleString()}</span>
                </div>
                <div class="info-row">
                    <span class="info-label">Status</span>
                    <span class="info-value">
                        <span class="status status--success">${transaction.status}</span>
                    </span>
                </div>
                <div class="info-row">
                    <span class="info-label">Balance After</span>
                    <span class="info-value font-bold">$${transaction.balanceAfter.toLocaleString()}</span>
                </div>
            </div>
        `;
        
        const detailsContainer = document.getElementById('transaction-details');
        const modal = document.getElementById('transaction-modal');
        
        if (detailsContainer && modal) {
            detailsContainer.innerHTML = details;
            modal.classList.remove('hidden');
        }
    }
    
    updateUserWelcome() {
        const welcome = document.getElementById('user-welcome');
        if (welcome && this.currentUser) {
            welcome.textContent = `Welcome, ${this.currentUser.firstName}`;
        }
    }
    
    showAdminNav() {
        const adminNav = document.getElementById('admin-nav');
        if (adminNav && this.currentUser) {
            if (this.currentUser.role === 'ADMIN') {
                adminNav.classList.remove('hidden');
            } else {
                adminNav.classList.add('hidden');
            }
        }
    }
    
    getUserAccounts() {
        if (!this.currentUser) return [];
        return this.accounts.filter(acc => acc.userId === this.currentUser.id);
    }
    
    closeModals() {
        document.querySelectorAll('.modal').forEach(modal => {
            modal.classList.add('hidden');
        });
    }
    
    showNotification(message, type = 'success') {
        const notification = document.getElementById('notification');
        const messageElement = document.getElementById('notification-message');
        
        if (notification && messageElement) {
            messageElement.textContent = message;
            notification.className = `notification ${type}`;
            notification.classList.remove('hidden');
            
            // Auto hide after 5 seconds
            setTimeout(() => {
                this.hideNotification();
            }, 5000);
        }
    }
    
    hideNotification() {
        const notification = document.getElementById('notification');
        if (notification) {
            notification.classList.add('hidden');
        }
    }
    
    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}

// Initialize the banking system when page loads
const bankingSystem = new BankingSystem();