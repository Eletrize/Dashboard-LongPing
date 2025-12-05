/**
 * ╔═══════════════════════════════════════════════════════════════════════════════╗
 * ║                    ARQUIVO DE TRADUÇÕES - DASHBOARD LONGPING                   ║
 * ╠═══════════════════════════════════════════════════════════════════════════════╣
 * ║  Este arquivo contém TODAS as traduções do sistema.                           ║
 * ║  Basta preencher os campos 'en' e 'zh' para cada termo.                       ║
 * ║                                                                                ║
 * ║  IDIOMAS:                                                                      ║
 * ║    pt = Português (Brasil) - idioma padrão/original                           ║
 * ║    en = English (USA)                                                         ║
 * ║    zh = 中文 (Chinês Simplificado)                                            ║
 * ║                                                                                ║
 * ║  COMO USAR:                                                                   ║
 * ║    1. Encontre o termo em português que deseja traduzir                       ║
 * ║    2. Preencha os campos 'en' e 'zh' com as traduções                         ║
 * ║    3. Salve o arquivo e recarregue a página                                   ║
 * ║                                                                                ║
 * ║  IMPORTANTE: NÃO altere o campo 'pt', ele é a referência original.           ║
 * ╚═══════════════════════════════════════════════════════════════════════════════╝
 */

const TRANSLATIONS = {

  // ═══════════════════════════════════════════════════════════════════════════════
  // MENU E INTERFACE DO SISTEMA
  // ═══════════════════════════════════════════════════════════════════════════════

  // Menu principal (popup que abre ao clicar no logo)
  'Idioma': { en: 'Language', zh: '语言' },
  'Cancelar': { en: 'Cancel', zh: '取消' },
  'Confirmar': { en: 'Confirm', zh: '确认' },
  'Tela cheia': { en: 'Fullscreen', zh: '全屏' },
  'Limpar cache': { en: 'Clear cache', zh: '清除缓存' },
  
  // Navegação inferior
  'Página inicial': { en: 'Home', zh: '首页' },
  'Cenários': { en: 'Scenes', zh: '场景' },

  // Links do menu
  'Instagram Eletrize': { en: 'Eletrize Instagram', zh: 'Eletrize 的 Instagram' },
  'Contato via WhatsApp': { en: 'Contact via WhatsApp', zh: '通过 WhatsApp 联系' },
  'Menu rápido': { en: 'Quick menu', zh: '快速菜单' },
  'Abrir informações do aplicativo': { en: 'Open app info', zh: '打开应用信息' },

  // ═══════════════════════════════════════════════════════════════════════════════
  // NOMES DOS AMBIENTES (Configurados no config.js)
  // ═══════════════════════════════════════════════════════════════════════════════

  'Prólogo': { en: 'Prologue', zh: '序厅' },
  'Circulação': { en: 'Hallway', zh: '流通' },
  'Imersão': { en: 'Immersion Zone', zh: '沉浸区' },
  'Pesquisa': { en: 'Research Room', zh: '研究室' },
  'Brasil': { en: 'Brazil', zh: '巴西馆' },
  'Maquete': { en: 'Model Display', zh: '模型展示' },
  'Cultura': { en: 'Culture Room', zh: '文化室' },
  'Descanso': { en: 'Lounge', zh: '休闲室' },

  // ═══════════════════════════════════════════════════════════════════════════════
  // FEATURES / BOTÕES DE CATEGORIA (Aparecem nos cards de ambiente)
  // ═══════════════════════════════════════════════════════════════════════════════

  'Iluminação': { en: 'Lighting', zh: '照明' },
  'Conforto': { en: 'Climate', zh: '舒适' },
  'Mídia': { en: 'Media', zh: '影音' },
  'Executar Cenário': { en: 'Run Scene', zh: '执行场景' },
  'Áudio': { en: 'Audio', zh: '音响' },
  'Projetores': { en: 'Projectors', zh: '投影仪' },
  'Televisores': { en: 'TVs', zh: '电视' },
  'Computadores': { en: 'Computers', zh: '电脑' },
  'Ligar': { en: 'On', zh: '开启' },
  'Desligar': { en: 'Off', zh: '关闭' },
  'Conectado': { en: 'Connected', zh: '已连接' },
  'Conectados': { en: 'Connected', zh: '已连接' },
  'Música': { en: 'Music', zh: '音乐' },

  // Seções e headers da home
  'Fluxos Principais': { en: 'Main Flows', zh: '主要流程' },
  'Ambientes': { en: 'Rooms', zh: '房间' },

  // Cards principais
  'Inicializar': { en: 'Start', zh: '开始' },
  'Finalização': { en: 'Shut Down', zh: '结束' },

  // ═══════════════════════════════════════════════════════════════════════════════
  // LUZES / ILUMINAÇÃO
  // ═══════════════════════════════════════════════════════════════════════════════

  'Luzes': { en: 'Lights', zh: '灯光' },
  'Spots': { en: 'Spotlights', zh: '射灯' },
  'Spots Corredor': { en: 'Hallway Spots', zh: '过道射灯' },
  'LED': { en: 'LED Strip', zh: '灯带' },
  'LED Nicho': { en: 'Niche LED', zh: '壁龛灯带' },
  'Luz': { en: 'Light', zh: '灯' },
  'Luz 1': { en: 'Light 1', zh: '1号灯' },
  'Luz 2': { en: 'Light 2', zh: '2号灯' },
  'Luz 3': { en: 'Light 3', zh: '3号灯' },

  // ═══════════════════════════════════════════════════════════════════════════════
  // AR CONDICIONADO / CONFORTO
  // ═══════════════════════════════════════════════════════════════════════════════


  // ═══════════════════════════════════════════════════════════════════════════════
  // MÍDIA - PROJETORES, TVs, ÁUDIO
  // ═══════════════════════════════════════════════════════════════════════════════



  // Dispositivos de mídia
  'Computador': { en: 'Computer', zh: '电脑' },
  'Projetor': { en: 'Projector', zh: '投影仪' },
  'Projetor I': { en: 'Projector 1', zh: '1号投影仪' },
  'Projetor II': { en: 'Projector 2', zh: '2号投影仪' },
  'Projetor III': { en: 'Projector 3', zh: '3号投影仪' },
  'Projetor IV': { en: 'Projector 4', zh: '4号投影仪' },
  'Projetor V': { en: 'Projector 5', zh: '5号投影仪' },
  'Projetor VI': { en: 'Projector 6', zh: '6号投影仪' },
  'Projetor 1': { en: 'Projector 1', zh: '1号投影仪' },
  'Projetor 2': { en: 'Projector 2', zh: '2号投影仪' },
  'Projetor 3': { en: 'Projector 3', zh: '3号投影仪' },
  'Projetor 4': { en: 'Projector 4', zh: '4号投影仪' },
  'Projetor 5': { en: 'Projector 5', zh: '5号投影仪' },
  'Projetor 6': { en: 'Projector 6', zh: '6号投影仪' },
  'Sala principal': { en: 'Main room', zh: '主厅' },
  'Sala secundária': { en: 'Secondary room', zh: '副厅' },
  'Projetor 1': { en: 'Projector 1', zh: '1号投影仪' },
  'Projetor 2': { en: 'Projector 2', zh: '2号投影仪' },
  'Projetor 3': { en: 'Projector 3', zh: '3号投影仪' },
  'Projetor 4': { en: 'Projector 4', zh: '4号投影仪' },
  'Projetor 5': { en: 'Projector 5', zh: '5号投影仪' },
  'Projetor 6': { en: 'Projector 6', zh: '6号投影仪' },
  'Televisão': { en: 'TV', zh: '电视' },
  'Televisão I': { en: 'TV 1', zh: '1号电视' },
  'Televisão II': { en: 'TV 2', zh: '2号电视' },
  'Televisão 1': { en: 'TV 1', zh: '1号电视' },
  'TV': { en: 'TV', zh: '电视' },
  'Telão': { en: 'Projection Screen', zh: '投影幕' },
  'Telão Entrada': { en: 'Entrance Screen', zh: '入口投影幕' },
  'On': { en: 'On', zh: '开启' },
  'Off': { en: 'Off', zh: '关闭' },
  'conectado': { en: 'connected', zh: '已连接' },
  'conectados': { en: 'connected', zh: '已连接' },
  // ═══════════════════════════════════════════════════════════════════════════════
  // CENÁRIOS
  // ═══════════════════════════════════════════════════════════════════════════════

  'Todas Ligadas': { en: 'All Lights On', zh: '开启所有灯光' },
  'Todas Desligadas': { en: 'All Lights Off', zh: '关闭所有灯光' },
  'Liga todas as luzes da casa': { en: 'Turn on all house lights', zh: '打开全屋灯光' },
  'Desliga todas as luzes da casa': { en: 'Turn off all house lights', zh: '关闭全屋灯光' },
  'Varanda Off': { en: 'Balcony Off', zh: '阳台关' },
  'Liga todas as luzes da varanda': { en: 'Turn on all balcony lights', zh: '打开阳台灯光' },
  'Desliga todas as luzes da varanda': { en: 'Turn off all balcony lights', zh: '关闭阳台灯光' },
  'Living Off': { en: 'Living Off', zh: '客厅关' },
  'Liga todas as luzes do living': { en: 'Turn on all living room lights', zh: '打开客厅灯光' },
  'Desliga todas as luzes do living': { en: 'Turn off all living room lights', zh: '关闭客厅灯光' },
  'Abrir Cortinas': { en: 'Open Curtains', zh: '打开所有窗帘' },
  'Fechar Cortinas': { en: 'Close Curtains', zh: '关闭所有窗帘' },
  'Abre todas as cortinas': { en: 'Open all curtains', zh: '打开全部窗帘' },
  'Fecha todas as cortinas': { en: 'Close all curtains', zh: '关闭全部窗帘' },



  // ═══════════════════════════════════════════════════════════════════════════════
  // MENSAGENS E CONFIRMAÇÕES
  // ═══════════════════════════════════════════════════════════════════════════════

  'Carregando...': { en: 'Loading...', zh: '加载中...' },
  'Erro ao carregar': { en: 'Failed to load', zh: '加载出错' },
  'Sucesso!': { en: 'Success!', zh: '成功！' },
  'Deseja realmente limpar todo o cache do aplicativo? Isso irá recarregar a página.': { 
    en: 'Are you sure you want to clear the app cache? This will reload the page.', 
    zh: '确定要清除应用缓存吗？这将重新加载页面。' 
  },
  'Nenhum dispositivo de mídia disponível para este ambiente.': { 
    en: 'No media device available for this room.', 
    zh: '此房间没有可用的影音设备。' 
  },
  'Nenhum dispositivo configurado para esta seção.': { en: 'No device configured for this section.', zh: '此部分没有配置设备。' },
  'Expandir': { en: 'Expand', zh: '展开' },
  'Recolher': { en: 'Collapse', zh: '收起' },
  'Voltar': { en: 'Back', zh: '返回' },

  // Popups e confirmações
  'Nenhum ambiente configurado.': { en: 'No rooms configured.', zh: '未配置任何房间。' },
  'Executar cenário "{envName}"? Isso irá ligar todos os dispositivos principais do ambiente.': {
    en: 'Run "{envName}" scene? This will turn on all main devices of the room.',
    zh: '执行“{envName}”场景？这将开启该房间的所有主要设备。'
  },
  'Nenhum dispositivo configurado para este ambiente.': { en: 'No device configured for this room.', zh: '此房间没有配置设备。' },
  'Erro ao executar cenário de {envName}: {error}': {
    en: 'Error running {envName} scene: {error}',
    zh: '执行 {envName} 场景时出错：{error}'
  },
  'Você tem certeza que gostaria de ligar tudo?': { en: 'Are you sure you want to turn everything on?', zh: '确定要全部开启吗？' },
  'Você tem certeza que gostaria de desligar tudo?': { en: 'Are you sure you want to turn everything off?', zh: '确定要全部关闭吗？' },
  'Você tem certeza que gostaria de subir todas as cortinas?': { en: 'Are you sure you want to raise all curtains?', zh: '确定要升起所有窗帘吗？' },
  'Você tem certeza que gostaria de descer todas as cortinas?': { en: 'Are you sure you want to lower all curtains?', zh: '确定要放下所有窗帘吗？' },
  'Você tem certeza que gostaria de abrir todas as cortinas?': { en: 'Are you sure you want to open all curtains?', zh: '确定要打开所有窗帘吗？' },
  'Você tem certeza que gostaria de fechar todas as cortinas?': { en: 'Are you sure you want to close all curtains?', zh: '确定要关闭所有窗帘吗？' },
  'Erro ao abrir cortinas: {error}': { en: 'Error opening curtains: {error}', zh: '打开窗帘时出错：{error}' },
  'Erro ao fechar cortinas: {error}': { en: 'Error closing curtains: {error}', zh: '关闭窗帘时出错：{error}' },
  'Executar cenário "Inicializar"? Isso irá ligar as luzes principais e abrir as cortinas de {varandaName} e {livingName}.': {
    en: 'Run "Start" scene? This will turn on main lights and open the curtains in {varandaName} and {livingName}.',
    zh: '执行“开始”场景？这将开启 {varandaName} 和 {livingName} 的主灯并打开窗帘。'
  },
  'Executar cenário "Finalização"? Isso irá desligar luzes, TV, ar condicionado, receiver e fechar as cortinas de {varandaName} e {livingName}.': {
    en: 'Run "Shut Down" scene? This will turn off lights, TV, AC, receiver and close the curtains in {varandaName} and {livingName}.',
    zh: '执行“结束”场景？这将关闭 {varandaName} 和 {livingName} 的灯光、电视、空调、功放并拉上窗帘。'
  },
  'Erro ao executar cenário Inicializar: {error}': {
    en: 'Error running Start scene: {error}',
    zh: '执行“开始”场景时出错：{error}'
  },
  'Erro ao executar cenário Dormir: {error}': {
    en: 'Error running Shut Down scene: {error}',
    zh: '执行“结束”场景时出错：{error}'
  },
  '⚠️Erro de Conexão': { en: '⚠️Connection Error', zh: '⚠️连接错误' },
  'Fechar': { en: 'Close', zh: '关闭' },
  'Falha na Conexão com Hubitat. Verifique se as Configurações foram alteradas no painel do Cloudflare.': {
    en: 'Hubitat connection failed. Check whether settings changed in the Cloudflare dashboard.',
    zh: '连接 Hubitat 失败。请检查 Cloudflare 面板中的设置是否已修改。'
  },
  'Timeout na Conexão. Verifique sua internet e tente novamente.': {
    en: 'Connection timeout. Check your internet and try again.',
    zh: '连接超时。请检查网络后重试。'
  },
  'Servidor temporariamente indisponível. Usando dados salvos.': {
    en: 'Server temporarily unavailable. Using saved data.',
    zh: '服务器暂时不可用。正在使用已保存的数据。'
  },
  'Sem Conexão com a internet. Modo offline ativado.': {
    en: 'No internet connection. Offline mode enabled.',
    zh: '没有互联网连接。已启用离线模式。'
  },
  'Problema no servidor. Usando últimos dados conhecidos.': {
    en: 'Server issue. Using last known data.',
    zh: '服务器出现问题。正在使用最近的数据。'
  },
  'Erro no carregamento. Usando dados salvos localmente.': {
    en: 'Load error. Using locally saved data.',
    zh: '加载出错。正在使用本地保存的数据。'
  },

  // Loading e progresso
  'Modo DEV - Estados salvos...': { en: 'DEV mode - Saved states...', zh: '开发模式 - 使用已保存状态…' },
  'Dispositivo {index}/{total}...': { en: 'Device {index}/{total}...', zh: '设备 {index}/{total}…' },
  'Carregamento concluído!': { en: 'Load complete!', zh: '加载完成！' },
  'Carregamento  concluído!': { en: 'Load complete!', zh: '加载完成！' },
  'Testando conectividade...': { en: 'Testing connectivity...', zh: '正在测试连接…' },
  'Conectando com servidor...': { en: 'Connecting to server...', zh: '正在连接服务器…' },
  'Enviando solicitação...': { en: 'Sending request...', zh: '正在发送请求…' },
  'Tentativa {attempt}/{maxRetries}...': { en: 'Attempt {attempt}/{maxRetries}...', zh: '第 {attempt}/{maxRetries} 次尝试…' },
  'Aguardando {seconds}s antes da próxima tentativa...': { en: 'Waiting {seconds}s before next attempt...', zh: '等待 {seconds} 秒再试…' },
  'Reagendando em {seconds}s...': { en: 'Retrying in {seconds}s...', zh: '{seconds} 秒后重试…' },
  'Recebendo dados...': { en: 'Receiving data...', zh: '正在接收数据…' },
  'Carregando backup {index}/{total}...': { en: 'Loading backup {index}/{total}...', zh: '正在加载备份 {index}/{total}…' },
  'Carregando {index}/{total}...': { en: 'Loading {index}/{total}...', zh: '正在加载 {index}/{total}…' },
  'Modo simples com polling ativo...': { en: 'Simple mode with polling active...', zh: '简易模式，轮询已启用…' },
  'Ativando sincronização...': { en: 'Enabling sync...', zh: '正在启用同步…' },
  'Sincronizando controles...': { en: 'Syncing controls...', zh: '正在同步控制…' },
  'Iniciando carregamento...': { en: 'Starting load...', zh: '开始加载…' },
  'Usando API direta como fallback...': { en: 'Using direct API as fallback...', zh: '使用直接 API 作为回退…' },
  'Carregamento via API direta  concluído!': { en: 'Direct API load complete!', zh: '通过直接 API 加载完成！' },
  'Processando estados...': { en: 'Processing states...', zh: '正在处理状态…' },
  'Finalizando sincronização...': { en: 'Finalizing sync...', zh: '正在完成同步…' },
  'Estados carregados com sucesso!': { en: 'States loaded successfully!', zh: '状态加载成功！' },
  'Timeout - usando backup...': { en: 'Timeout - using backup...', zh: '超时——使用备份…' },
  'Falhas múltiplas - modo backup...': { en: 'Multiple failures - backup mode...', zh: '多次失败——进入备份模式…' },
  'Sem rede - modo offline...': { en: 'No network - offline mode...', zh: '无网络——离线模式…' },
  'Erro servidor - backup...': { en: 'Server error - backup...', zh: '服务器错误——使用备份…' },
  'Erro geral - usando backup...': { en: 'General error - using backup...', zh: '通用错误——使用备份…' },
  'Modo simples com polling ativo!': { en: 'Simple mode with polling active!', zh: '简易模式，轮询已启用！' },
  'Iniciando polling...': { en: 'Starting polling...', zh: '开始轮询…' },
  'Erro crítico - recarregue a página': { en: 'Critical error - reload the page', zh: '严重错误——请重新加载页面' },
  'Processando {index}/{total}...': { en: 'Processing {index}/{total}...', zh: '正在处理 {index}/{total}…' },
  'Carregamento  concluído (modo offline)': { en: 'Load complete (offline mode)', zh: '加载完成（离线模式）' },

  'Executar cenário "Inicializar"? Isso irá ligar as luzes, Ar Condicionado, Computadores e Projetores.': {
    en: 'Run "Initialize" scene? This will turn on lights, AC, computers, and projectors.',
    zh: '执行“初始化”场景？这将开启灯光、空调、电脑和投影仪。'
  },
  'Executar cenário "Finalização"? Isso irá desligar luzes, Ar Condicionado, Computadores e Projetores.': {
    en: 'Run "Shutdown" scene? This will turn off lights, AC, computers, and projectors.',
    zh: '执行“结束”场景？这将关闭灯光、空调、电脑和投影仪。'
  },
};

// ═══════════════════════════════════════════════════════════════════════════════
// NÃO MODIFIQUE ABAIXO DESTA LINHA
// ═══════════════════════════════════════════════════════════════════════════════

// Exportar para uso global
window.TRANSLATIONS = TRANSLATIONS;
