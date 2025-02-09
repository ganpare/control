// 認証情報を取得する関数
async function getAuthConfig() {
    const response = await fetch('/api/auth-config');
    const config = await response.json();
    return btoa(`${config.username}:${config.password}`);
}

// グローバルな認証トークン
let auth;

// 初期化関数
async function initialize() {
    auth = await getAuthConfig();
    await fetchScripts();
    await updateLogs();
    // 定期的にログを更新
    setInterval(updateLogs, 5000);
}

async function fetchScripts() {
    const response = await fetch('/api/scripts', {
        headers: {
            'Authorization': `Basic ${auth}`
        }
    });
    const scripts = await response.json();
    
    const scriptList = document.getElementById('scriptList');
    scriptList.innerHTML = '';
    
    Object.entries(scripts).forEach(([id, script]) => {
        const div = document.createElement('div');
        div.className = 'flex items-center justify-between p-4 bg-gray-50 rounded';
        div.innerHTML = `
            <div>
                <h3 class="font-semibold">${id}</h3>
                <p class="text-sm text-gray-600">${script.description}</p>
            </div>
            <button onclick="runScript('${id}')" 
                    class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                実行
            </button>
        `;
        scriptList.appendChild(div);
    });
}

async function runScript(scriptId) {
    try {
        const response = await fetch(`/api/run/${scriptId}`, {
            method: 'POST',
            headers: {
                'Authorization': `Basic ${auth}`
            }
        });
        const result = await response.json();
        updateLogs();
    } catch (error) {
        console.error('Error:', error);
    }
}

async function updateLogs() {
    const response = await fetch('/api/logs', {
        headers: {
            'Authorization': `Basic ${auth}`
        }
    });
    const logs = await response.json();
    
    const logList = document.getElementById('logList');
    logList.innerHTML = '';
    
    logs.reverse().forEach(log => {
        const div = document.createElement('div');
        div.className = 'p-4 bg-gray-50 rounded';
        div.innerHTML = `
            <div class="flex justify-between items-center mb-2">
                <span class="font-semibold">${log.script_id}</span>
                <span class="text-sm text-gray-600">
                    ${new Date(log.timestamp * 1000).toLocaleString()}
                </span>
            </div>
            <pre class="text-sm bg-gray-100 p-2 rounded whitespace-pre-wrap break-words">${log.output || log.error}</pre>
        `;
        logList.appendChild(div);
    });
}

// アプリケーションの初期化
initialize();
