<?php
header('Content-Type: application/json');

// Função de limpeza
function limpar($valor) {
  return trim(strip_tags($valor));
}

// Verifica método
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
  echo json_encode(['success' => false, 'message' => 'Método inválido']);
  exit;
}

// Validação
$nome     = limpar($_POST['nome'] ?? '');
$telefone = limpar($_POST['telefone'] ?? '');
$email    = limpar($_POST['email'] ?? '');
$sistema  = limpar($_POST['sistema'] ?? '');
$politica = isset($_POST['politica']);

if (!$nome || !$telefone || !$email || !$sistema || !$politica) {
  echo json_encode(['success' => false, 'message' => 'Campos obrigatórios faltando']);
  exit;
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
  echo json_encode(['success' => false, 'message' => 'E-mail inválido']);
  exit;
}

$arquivo = __DIR__ . '/contatos.csv';

// Cria arquivo com cabeçalho se não existir
if (!file_exists($arquivo)) {
  $header = ['Nome', 'Telefone', 'Email', 'Sistema', 'Data'];
  $fp = fopen($arquivo, 'w');
  fputcsv($fp, $header, ';');
  fclose($fp);
}

// Abre para escrita
$fp = fopen($arquivo, 'a');

$linha = [
  $nome,
  $telefone,
  $email,
  $sistema,
  date('d/m/Y H:i:s')
];

fputcsv($fp, $linha, ';');
fclose($fp);

// Retorno final
echo json_encode(['success' => true]);
