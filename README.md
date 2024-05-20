# Projeto Humanos - Altamira

Este projeto foi desenvolvido em homenagem ao podcast Projeto Humanos cuja a quinta temporada tem como o tema Altamira.

## Links
Veja o <a href="https://gabriersdev.github.io/projeto-humanos-altamira/">projeto publicado</a> no GitHub Pages ou o 
<a href="https://www.behance.net/gallery/164149893/Projeto-Humanos-Altamira-%28Not-Official%29">protótipo do projeto</a> na Behance.

## Funcionalidades do Projeto
<ul>
  <li>
    <b>Mudança de Tema (entre claro e escuro)</b><br>
    No projeto existem dois arquivos para temas no diretório assets/css/temas cujo atributo "src" para importação no HTML é alterado ao clicar em no botão "Modo Claro" ou "Modo Escuro". O tema selecionado é armazenando no computador através do <code>localStorage</code>. Toda a vez que a página é carregada a função <code>verificarTema()</code> é acionada e verifica se um tema foi salvo. Se positivo, o atributo "src" do arquivo de tema da página é alterado para o tema salvo, através da função <code>trocarTema(tema)</code>. Caso contrário, a página será renderizada no tema escuro.
  </li><br>

  <li>
    <b>Player para as faixas da Trilha Sonora</b><br>
    Os arquivos de áudio que são renderizados pelo player estão no diretório assets/audios. Quando clica em algum dos botões do player um dos métodos de escuta de evento são acionados. O player realiza as seguintes funções:<br><br>
    <ul>
      <li>Play/Pause das faixas</li>
      <li>Reproduzir a faixa anterior</li>
      <li>Reproduzir a próxima faixa</li>
      <li>Atualizar o nome da faixa, tempo de reprodução e o tempo reproduzindo</li>
      <li>Alterar o volume através da interação com o <code>input:range</code></li>
      <li>Escolher uma das faixas para reproduzir através da playlist</li>
      <li>Voltar ou retroceder música através da interação com o <code>input:range</code></li>
    </ul><br>
    O nome da última selecionada para a reprodução é armazenado no computador através do <code>localStorage</code>. Toda a vez que a página é carregada a função <code>verificarFaixaRegistrada()</code> verifica se o nome de uma faixa foi salvo ou não e retorna o nome ou <code>null</code>. Caso o retorno seja nulo, a faixa "Os Meninos de 
    Altamira" é carregada para a reprodução. Se o retorno for válido, a faixa cujo o nome foi armazenado é carregada para reprodução.<br>
    O volume é alterado atráves de um <code>input:range</code> em uma <code>div</code> com o comportamento de dropdown. A escolha de um nível de volume também é armazenado no computador através do <code>localStorage</code>. E no carregamento da página a função <code>verificarVolumeDefinido()</code> verifica se um nível de volume foi armazenado. Se tiver sido, esse nível é definido como volume, caso contrário, o volume é definido em 30%. 
  </li><br>

  <li>
    <b>Últimos episódios</b><br>
    Os dados dos todos os episódios estão armazenados no objeto <code>episodiosConteudo</code> através da função <code>comparaNumero(a, b)</code>, os episódios são ordenados de acordo com o número deles, em ordem crescente. A função <code>carregarUltimosEpisodios(quantidade)</code> carrega os episódios em ordem decrescente e usa o método <code>slice()</code> para carregar apenas os X últimos episódios - quantidade informada através do parâmetro da função. O botão "Ver Mais" oculta a seção de exibe a seção de "Todos os episódios".
  </li><br>
  
  <li>
    <b>Todos os episódios</b><br>
    Os dados do objeto <code>episodiosConteudo</code> são carregados ordenados de acordo com os seus números. O botão "Ver Mais" carrega mais seis episódios, toda a vez que é acionado, até que todos os episódios já tenham sido exibidos.
    É possível fazer a consultas, basta começar a preencher o <code>input:text</code> cujo o atributo placeholder é "Episódio", e, conforme correspondências forem encontradas um menu suspenso de autocomplete será exibido. Para exibir os resultados basta clicar em [ENTER] ou no botão da lupa (pesquisa). <br>
    Os resultados para a busca são exibidos logo abaixo do título da seção e caso a consulta retorne mais que seis resultados, o botao "Mais Resultados" é exibido, e, ao clicar nele outros seis resultados são carregados, até que todos os resultados encontrados sejam exibidos.
  </li><br>

  <li>
    <b>Personagens</b><br>
    Assim como a seção de "Todos os episódios", a seção de Personagens carrega os dados de um objeto, no caso <code>personagensConteudo</code>, permite a exibição de mais personagens, até que todos tenham sido mostrados e, também é possível fazer uma pesquisa.
  </li><br>
  
  <li>
    <b>Seção de Recomendação</b><br>
    No momento do carregamento da página, a função <code>sortearEmbed()</code> sorteia um dos embeds para ser ocultado (<code>display: none</code>). Conforme o embed exibido as regras de estilo mudam.
  </li><br>

  <li>
    <b>Créditos</b><br>
    Assim como a seção de "Todos os episódios" e "Personagens", a seção de Créditos carrega os dados de um objeto, no caso <code>creditosConteudo</code>, permite a exibição de mais créditos, até que todos tenham sido mostrados e, também é possível fazer uma pesquisa.
  </li><br>

  <li>
    <b>Pesquisa</b><br>
    As funções de pesquisa utilizam propriedades e métodos de string (como o <code>toLowerCase(), substr(), trim() e split()</code>) e também métodos de array (como o <code>filter(), find() e some()</code>) para encontrar correspondências para o que foi pesquisado.
  </li><br>
</ul>

 O padrão de arquitetura MVC foi utilizado no projeto e classes foram implementadas para os objetos Creditos, Episodios, Personagens e Trilha Sonora.