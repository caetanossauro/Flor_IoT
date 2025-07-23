# Monitoramento e Controle Ambiental Inteligente para a Flor com ESP8266 e Google Sheets 
Um projeto de Internet das Coisas (IoT) essencial para garantir o bem-estar da minha jabuti piranga, Flor, coletando dados de temperatura e umidade em tempo real diretamente da sua toca e ajustando ativamente o ambiente via relé. Os dados são enviados e registrados em uma planilha Google Sheets.

# Sobre o Projeto
Este projeto nasceu de uma necessidade muito pessoal: garantir o bem-estar da minha querida jabuti piranga, Flor. Vivendo em Lauro de Freitas, Bahia, percebi que o clima na minha cidade varia bastante ao longo do dia e das estações. Sabendo que a espécie de Flor, Chelonoidis carbonarius, tem uma temperatura ideal de bem-estar entre 25°C e 30°C, e passando a maior parte do dia fora de casa, não conseguia monitorar presencialmente se ela estava na faixa de conforto.

A ideia foi implementar um sistema de monitoramento e controle ambiental remoto diretamente na toca da Flor – o lugar onde ela adora ficar e onde dorme. O sistema não apenas coleta dados de temperatura e umidade em tempo real, mas também aciona automaticamente um dispositivo (lampada de cerâmica) via relé para manter a temperatura dentro da faixa ideal. As primeiras medições confirmaram a variabilidade: 17/07/2027, a temperatura mínima registrada foi de 21,60°C e a média foi de 24,37°C, reforçando a importância deste monitoramento e controle ativo.

# Funcionalidades
Coleta de Dados Precisos: Leitura contínua de temperatura e umidade usando o sensor DHT22 a cada 15 segundos.

Dashboard em tempo real: Os valores de temperatura e umidade pode ser visualizados a qualquer momento no dispositivo móvel ou computador via Arduino IoT cloud.

Controle de Temperatura Ativo: Aciona/desaciona um relé com base na temperatura lida, mantendo o ambiente dentro da faixa ideal (configurado para ligar um dispositivo se a temperatura cair abaixo de 26°C).

Conectividade Wi-Fi: O ESP8266 se conecta à rede Wi-Fi local para acesso à internet.

Envio de Dados para a Nuvem: Os dados são enviados para uma planilha Google Sheets via Google Apps Script a cada 30 minutos.

Armazenamento Organizado: Cada nova leitura é registrada como uma nova linha na planilha, incluindo data e hora, permitindo o acompanhamento do histórico ambiental da Flor.

Baixo Custo e Acessibilidade: Utiliza hardware comum de IoT e serviços gratuitos do Google, tornando a solução replicável.

# Desafios Enfrentados e Soluções
A construção deste projeto apresentou alguns desafios interessantes, principalmente na integração e segurança da comunicação:

Comunicação Segura (HTTPS) e Certificados SSL:

Desafio: O Google Apps Script exige comunicação via HTTPS (SSL/TLS), o que demanda que o ESP8266 valide os certificados de segurança do servidor. Inicialmente, o sistema falhava com erros como "connection refused".

Tentativas: Tentei implementar a validação de certificado usando o fingerprint SHA-1 do servidor script.google.com. No entanto, manter o fingerprint atualizado e garantir que ele fosse sempre o correto provou ser um desafio para a estabilidade do sistema, levando a novas falhas de conexão.

Solução Atual: Para garantir a funcionalidade e a conclusão do projeto em um ambiente controlado e focado no bem-estar da Flor, optei por usar client.setInsecure() da biblioteca WiFiClientSecure. Esta função desabilita a validação de certificados SSL/TLS, permitindo que a conexão HTTPS prossiga.

Atenção: Embora eficaz para prototipagem e ambientes não críticos, setInsecure() NÃO é recomendado para aplicações em produção que lidam com dados sensíveis, pois remove a camada de segurança contra ataques "Man-in-the-Middle". Para este cenário específico de monitoramento do ambiente da Flor, foi uma solução prática e segura o suficiente.

Sincronização de Tempo (NTP):

Desafio: A validação de certificados SSL depende intrinsecamente de uma hora precisa. Se o relógio do ESP8266 estiver muito dessincronizado, o certificado do servidor pode parecer inválido (expirado ou futuro), resultando em falhas de conexão HTTPS.

Solução: Embora não explícito no código final compartilhado, a sincronização do relógio do ESP8266 com um servidor NTP (Network Time Protocol) é uma prática recomendada e foi considerada um passo fundamental durante o desenvolvimento para garantir que o microcontrolador tivesse a hora correta antes de tentar estabelecer a conexão segura. (No seu código atual, a parte do NTP foi removida, mas a compreensão de sua importância foi um desafio superado).

Formato do Payload de Dados:

Desafio: Garantir que o Google Apps Script recebesse os dados do sensor no formato correto foi crucial.

Solução: A comunicação foi simplificada para uma requisição HTTP GET, onde os dados de temperatura e umidade são enviados como parâmetros na URL. Isso simplifica tanto o código do ESP8266 (que constrói a URL) quanto o código do Google Apps Script (que os lê diretamente de e.parameter).

# Por que monitorar e controlar a temperatura de Jabutis Piranga é crucial?
A temperatura ambiente é vital para a saúde de répteis ectotérmicos como a Flor. Manter a temperatura entre 25°C e 30°C é essencial. Temperaturas fora dessa faixa podem levar a:

Frio excessivo (abaixo de 25°C): Causa letargia, inatividade, problemas digestivos severos, supressão do sistema imunológico (tornando-os vulneráveis a doenças como pneumonia) e perda de apetite. As medições de ontem, com mínima de 21,60°C, mostram a relevância de monitorar e, mais importante, agir para elevar essa temperatura.

Calor excessivo (acima de 30°C sem alívio): Pode resultar em superaquecimento, desidratação severa e estresse, comprometendo o bem-estar geral do animal.

Este sistema me permite não apenas acompanhar, mas garantir ativamente que a Flor esteja sempre nas condições ideais, promovendo sua saúde e vitalidade.

# Materiais Necessários
* Microcontrolador: ESP8266 (NodeMCU ESP-12E)

* Sensor: DHT22 (Temperatura e Umidade)

* Módulo Relé: 1 canal (compatível com 3.3V do ESP8266)

* Dispositivo de Aquecimento/Resfriamento: (Lâmpada Cerâmica Aquecedor Repteis E Aves Aquecimento, conectado ao relé. Atenção: A escolha e segurança deste dispositivo são cruciais para o bem-estar do animal.)

* Cabos Jumper

* Mini Protoboard (Opcional, para montagem compacta na toca)

* Fonte de Alimentação: (USB para o ESP8266, ou power bank para mobilidade)

# Montagem do Hardware
Conecte o sensor DHT22 e o módulo relé ao seu ESP8266 da seguinte forma:

Pino VCC (DHT22) ao 3.3V (ESP8266)

Pino GND (DHT22) ao GND (ESP8266)

Pino Data (DHT22) ao D2 (ESP8266 - GPIO4)

Pino VCC (Relé) ao 3.3V/5V (ESP8266 - dependendo do relé, 3.3V é mais seguro para o pino de controle do ESP8266)

Pino GND (Relé) ao GND (ESP8266)

Pino IN (Relé) ao D1 (ESP8266 - GPIO5)

Certifique-se de que seu relé é compatível com os 3.3V do ESP8266 (alguns relés operam com 5V na bobina, mas aceitam sinal de 3.3V na entrada de controle). Conecte o dispositivo de aquecimento/resfriamento ao relé conforme as instruções de segurança do fabricante do relé e do dispositivo (e do dispositivo controlado). É crucial garantir a segurança elétrica e a adequação do dispositivo à toca da Flor. Considere um invólucro para proteger o circuito dentro da toca da Flor.

# Configuração do Software
## Configuração do Google Sheets e Apps Script
    *Crie uma Nova Planilha Google Sheets:
    
    Acesse Google Sheets e crie uma nova planilha.
    
    Você pode nomear as colunas da sua planilha (ex: "Data", "Hora", "Dispositivo", "Temperatura (°C)", "Umidade (%)").
    
    Crie e Publique o Google Apps Script:
    
    Na sua planilha, vá em Extensões > Apps Script.
    
    Copie e cole o conteúdo do arquivo google_apps_script/code.js (fornecido neste repositório) no editor de scripts.
    
    Altere o planilhaID no código para o ID da sua planilha (você encontra o ID na URL da sua planilha, entre /d/ e /edit).
    
    Salve o script (ícone de disquete).
    
    Implante o Script como Web App:
    
    Clique em Implantar (Deploy) > Nova implantação.
    
    Para "Tipo de implantação", escolha "Aplicativo da Web".
    
    Em "Executar como", selecione "Eu" (seu e-mail).
    
    Em "Quem tem acesso", selecione "Qualquer pessoa".
    
    Clique em "Implantar".
    
    O Google pedirá autorização. Autorize o script a acessar suas planilhas.
    
    Após o deploy, você receberá a URL do aplicativo da Web. COPIE ESTA URL COMPLETA (ela terminará em /exec). Esta será a appscriptID no seu código ESP8266 (mas você precisará extrair apenas o ID da URL completa para a variável appscriptID).

* Configuração do Código ESP8266 (Arduino Cloud)
    Abra o Projeto: Abra o arquivo src/Flor_IoT_jul21a.ino e vá para o Arduino Cloud.
    
    Crie uma "Thing": No Arduino Cloud crie uma "coisa" e cole o código em Sketch
    
    Configuração: No Arduino Cloud em Setup associe o seu dispositivo e configure a conexão com a rede Wifi
    
    Baixe o Arduino Cloud Agent: Este aplicativo ajudará o Arduino Cloud a se conectar com o seu dispositivo
    
    Faça o Upload: Conecte seu ESP8266 ao computador, selecione a placa (Node MCU 1.0 - ESP-12E Module) e a porta corretas na Arduino Cloud e faça o upload do código.
    
    Monitore: Abra o Serial Monitor (com a mesma taxa de Serial.begin(115200)) para ver o progresso da conexão, leituras do sensor, ações do relé e respostas do Apps Script.

# Visualizando os Dados e o Impacto
Uma vez que o ESP8266 esteja funcionando e enviando dados, abro minha planilha Google Sheets e vejo novas linhas sendo adicionadas automaticamente com os dados de temperatura, umidade e o timestamp. Esse monitoramento contínuo e o controle ativo me trazem uma total felicidade, realização e satisfação, sabendo que estou ativamente cuidando da saúde e conforto da Flor, mesmo quando não estou em casa. Posso criar gráficos na planilha para visualizar as tendências e confirmar que ela esteja sempre na zona de temperatura ideal.

# Contribuição
Sinta-se à vontade para abrir issues ou pull requests caso encontre bugs ou queira adicionar melhorias!

# Autor
Cleidson Santos Oliveira 
* [LinkedIn](https://www.linkedin.com/in/cleidson-oliveira-7b7248215/)

# Licença
Este projeto é licenciado sob a Licença MIT.
