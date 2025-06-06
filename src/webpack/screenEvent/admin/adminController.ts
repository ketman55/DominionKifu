import { deleteGameLogApi } from '../../logic/callApi/deleteGameLog';
import { deleteCommentApi } from '../../logic/callApi/deleteComment';
import { getGameNumberList } from '../../logic/callApi/getGameNumberList';
import { getAllCommentsApi } from '../../logic/callApi/getAllComments';
import { adminLoginApi } from '../../logic/callApi/adminLogin';

let adminToken: string | null = null;

interface Comment {
    gameNumber: string;
    pointer: number;
    comment: string;
    userName: string;
    date: string;
}

// 初期化処理
document.addEventListener('DOMContentLoaded', () => {
    initializeAdminPanel();
});

function initializeAdminPanel() {
    const loginButton = document.getElementById('loginButton') as HTMLButtonElement;
    const refreshGameLogsButton = document.getElementById('refreshGameLogs') as HTMLButtonElement;
    const refreshCommentsButton = document.getElementById('refreshComments') as HTMLButtonElement;
    const confirmYesButton = document.getElementById('confirmYes') as HTMLButtonElement;
    const confirmNoButton = document.getElementById('confirmNo') as HTMLButtonElement;

    loginButton.addEventListener('click', handleLogin);
    refreshGameLogsButton.addEventListener('click', loadGameLogs);
    refreshCommentsButton.addEventListener('click', loadComments);
    confirmYesButton.addEventListener('click', handleConfirmYes);
    confirmNoButton.addEventListener('click', hideConfirmDialog);

    // パスワード入力でEnterキーを押した場合のログイン
    const passwordInput = document.getElementById('adminPassword') as HTMLInputElement;
    passwordInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            handleLogin();
        }
    });
}

async function handleLogin() {
    const passwordInput = document.getElementById('adminPassword') as HTMLInputElement;
    const password = passwordInput.value.trim();
    const messageDiv = document.getElementById('authMessage') as HTMLDivElement;

    if (!password) {
        showMessage('Please enter admin password', 'error');
        return;
    }

    try {
        const result = await adminLoginApi(password);
        if (result.success) {
            adminToken = result.token || null;
            showAdminPanel();
            showMessage('Login successful', 'success');
            await loadGameLogs();
            await loadComments();
        } else {
            showMessage('Invalid admin password', 'error');
        }
    } catch (error) {
        showMessage('Login failed', 'error');
        console.error('Login error:', error);
    }
}

function showAdminPanel() {
    const authSection = document.getElementById('AuthSection') as HTMLDivElement;
    const adminPanel = document.getElementById('AdminPanel') as HTMLDivElement;
    
    authSection.style.display = 'none';
    adminPanel.style.display = 'block';
}

function showMessage(message: string, type: 'success' | 'error') {
    const messageDiv = document.getElementById('authMessage') as HTMLDivElement;
    messageDiv.textContent = message;
    messageDiv.className = `message ${type}`;
    messageDiv.style.display = 'block';
    
    setTimeout(() => {
        messageDiv.style.display = 'none';
    }, 3000);
}

async function loadGameLogs() {
    if (!adminToken) return;

    try {
        const gameNumbers = await getGameNumberList();
        const tableBody = document.querySelector('#gameLogTable tbody') as HTMLTableSectionElement;
        
        tableBody.innerHTML = '';
        
        gameNumbers.forEach((gameNumber: string) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${gameNumber}</td>
                <td>
                    <button class="btn-danger" onclick="confirmDeleteGameLog('${gameNumber}')">Delete</button>
                </td>
            `;
            tableBody.appendChild(row);
        });
    } catch (error) {
        console.error('Failed to load game logs:', error);
        alert('Failed to load game logs');
    }
}

async function loadComments() {
    if (!adminToken) return;

    try {
        const comments = await getAllCommentsApi();
        const tableBody = document.querySelector('#commentTable tbody') as HTMLTableSectionElement;
        
        tableBody.innerHTML = '';
        
        comments.forEach((comment: Comment) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${comment.gameNumber}</td>
                <td>${comment.pointer}</td>
                <td>${comment.userName}</td>
                <td>${comment.comment}</td>
                <td>${comment.date}</td>
                <td>
                    <button class="btn-danger" onclick="confirmDeleteComment('${comment.gameNumber}', ${comment.pointer})">Delete</button>
                </td>
            `;
            tableBody.appendChild(row);
        });
    } catch (error) {
        console.error('Failed to load comments:', error);
        alert('Failed to load comments');
    }
}

let pendingDeleteAction: (() => Promise<void>) | null = null;

function confirmDeleteGameLog(gameNumber: string) {
    pendingDeleteAction = async () => {
        await deleteGameLogApi(gameNumber, adminToken!);
        await loadGameLogs();
    };
    
    const confirmMessage = document.getElementById('confirmMessage') as HTMLParagraphElement;
    confirmMessage.textContent = `Are you sure you want to delete game log ${gameNumber}?`;
    showConfirmDialog();
}

function confirmDeleteComment(gameNumber: string, pointer: number) {
    pendingDeleteAction = async () => {
        await deleteCommentApi(gameNumber, pointer, adminToken!);
        await loadComments();
    };
    
    const confirmMessage = document.getElementById('confirmMessage') as HTMLParagraphElement;
    confirmMessage.textContent = `Are you sure you want to delete comment from game ${gameNumber}, pointer ${pointer}?`;
    showConfirmDialog();
}

function showConfirmDialog() {
    const confirmDialog = document.getElementById('confirmDialog') as HTMLDivElement;
    confirmDialog.style.display = 'block';
}

function hideConfirmDialog() {
    const confirmDialog = document.getElementById('confirmDialog') as HTMLDivElement;
    confirmDialog.style.display = 'none';
    pendingDeleteAction = null;
}

async function handleConfirmYes() {
    if (pendingDeleteAction) {
        try {
            await pendingDeleteAction();
            hideConfirmDialog();
            alert('Deletion completed successfully');
        } catch (error) {
            console.error('Delete failed:', error);
            alert('Deletion failed');
        }
    }
}

// グローバル関数として公開（HTMLから呼び出すため）
(window as any).confirmDeleteGameLog = confirmDeleteGameLog;
(window as any).confirmDeleteComment = confirmDeleteComment;