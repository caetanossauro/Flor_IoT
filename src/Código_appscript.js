function doGet(e) { 
  Logger.log( JSON.stringify(e) );
  var resultado = 'Ok';
  if (e.parameter == 'undefined') {
    resultado = 'Nenhum parâmetro';
  }
  else {
    var planilhaID = 'ID-DA-SUA-PLANILHA';
    var planilha = SpreadsheetApp.openById(planilhaID).getActiveSheet();
    var newRow = planilha.getLastRow() + 1;						
    var linhaDados = [];


    var dtaAtual = new Date();
    linhaDados[0] = dtaAtual;
    var horaAtual = Utilities.formatDate(dtaAtual, 'America/Sao_Paulo', 'HH:mm:ss');

    linhaDados[1] = horaAtual;

    for (var param in e.parameter) {
      Logger.log('In for loop, param=' + param);
      var valor = stripQuotes(e.parameter[param]);
      Logger.log(param + ':' + e.parameter[param]);
      switch (param) {
        case 'nome':
          linhaDados[2] = valor;
          resultado = 'Descrição foi inserido na coluna C'; 
          break;
        case 'temp':
          linhaDados[3] = valor.replace(".",",");
          resultado += ' , Valor foi inserido na coluna D'; 
          break;
        case 'hume':
          linhaDados[4] = valor.replace(".", ",");
          resultado += ' , Valor foi inserido na coluna E'; 
          break;   
        default:
          resultado = "parametro nao suportado. Entre em contato com o desenvolvedor";
      }
    }
    Logger.log(JSON.stringify(linhaDados));
    var newRange = planilha.getRange(newRow, 1, 1, linhaDados.length);
    newRange.setValues([linhaDados]);
  }
  return ContentService.createTextOutput(resultado);
}
function stripQuotes( value ) {
  return value.replace(/^["']|['"]$/g, "");
}
