/**
 * @param {*} name: 代理组名称
 * @param {*} type: 代理组类型，可选 'select' | 'url-test' | 'fallback'
 * @param {*} proxies: 节点数组
 * @param {*} icon: 代理组icon图标
 */
function ProxyGroup(name, type, proxies, icon) {
  this.name = name
  this.type = type
  this.proxies = proxies
  this.url = 'http://www.gstatic.com/generate_204'
  this.interval = 300
  this.timeout = 500
  this.icon = icon
}

/**
 * @param {*} url: 规则文件直链
 * @param {*} proxy: 指定更新规则时使用的代理节点
 * @param {*} behavior： 可选'domain' | 'ipcidr' | 'classical'
 */
function RuleProvider(url, path, proxy, behavior) {
  this.type = 'http'
  this.url = url
  this.path = path
  this.interval = 1800
  this.proxy = proxy
  this.behavior = behavior
  this.format = 'yaml'
}

function filterNodes(proxies, ...prefixes) {
  return proxies
    .filter((element) => {
      const regex = new RegExp(prefixes.join('|'), 'i')
      if (regex.test(element.name)) return element
    })
    .map((element) => element.name)
}

function main(config, profileName) {
  const HongKong = new ProxyGroup(
    '香港节点',
    'url-test',
    [...filterNodes(config['proxies'], '香港', 'Hong Kong')],
    'https://fastly.jsdelivr.net/gh/Semporia/Hand-Painted-icon@master/Rounded_Rectangle/Hong_Kong.png'
  )

  const Taiwan = new ProxyGroup(
    '台湾节点',
    'url-test',
    [...filterNodes(config['proxies'], '台湾', 'Taiwan')],
    'https://fastly.jsdelivr.net/gh/Semporia/Hand-Painted-icon@master/Rounded_Rectangle/Taiwan.png'
  )

  const Janpan = new ProxyGroup(
    '日本节点',
    'url-test',
    [...filterNodes(config['proxies'], '日本', 'Japan')],
    'https://fastly.jsdelivr.net/gh/Semporia/Hand-Painted-icon@master/Rounded_Rectangle/Japan.png'
  )

  const Singapore = new ProxyGroup(
    '新加坡节点',
    'url-test',
    [...filterNodes(config['proxies'], '新加坡', 'Singapore')],
    'https://fastly.jsdelivr.net/gh/Semporia/Hand-Painted-icon@master/Rounded_Rectangle/Singapore.png'
  )

  const America = new ProxyGroup(
    '美国节点',
    'url-test',
    [...filterNodes(config['proxies'], '美国', 'United States')],
    'https://fastly.jsdelivr.net/gh/Semporia/Hand-Painted-icon@master/Rounded_Rectangle/United_States.png'
  )

  const Default = new ProxyGroup(
    // '🚀 手动切换',
    profileName,
    'select',
    [HongKong.name, Taiwan.name, Janpan.name, Singapore.name, America.name],
    'https://fastly.jsdelivr.net/gh/Semporia/Hand-Painted-icon@master/Accommodation/Airplane.png'
  )

  config['rules'] = [`MATCH,${Default.name}`]

  config['proxy-groups'] = [Default, HongKong, Taiwan, Janpan, America, Singapore]

  return config
}
