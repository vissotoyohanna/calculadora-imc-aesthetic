function calcular() {
    const pegarValor = (id) => {
        const campo = document.getElementById(id).value;
        if (!campo) return NaN;
        return parseFloat(campo.replace(',', '.'));
    };

    const idade = parseInt(document.getElementById('idade').value);
    let altura = pegarValor('altura');
    const pesoInicial = pegarValor('pesoInicial');
    const pesoAtual = pegarValor('pesoAtual');
    const pesoMeta = pegarValor('pesoMeta');

    if (!idade || idade <= 0) {
        alert("Idade inválida! Por favor, insira uma idade real. 🌸");
        return;
    }
    if (!altura || altura <= 0 || !pesoInicial || pesoInicial <= 0 || !pesoAtual || pesoAtual <= 0 || !pesoMeta || pesoMeta <= 0) {
        alert("Por favor, preencha todos os campos de peso e altura com valores válidos e positivos! ✨");
        return;
    }

    if (altura > 3) {
        altura = altura / 100;
    }

    const imc = pesoAtual / (altura * altura);
    let classificacao = "";

    if (imc < 18.5) classificacao = "Abaixo do peso 🍂";
    else if (imc < 24.9) classificacao = "Peso normal ✨";
    else if (imc < 29.9) classificacao = "Sobrepeso 🌷";
    else classificacao = "Obesidade 🌺";

    document.getElementById('resultadoIMC').innerText = `Seu IMC é ${imc.toFixed(1)}`;
    document.getElementById('classificacaoIMC').innerText = classificacao;

    const isEmagrecimento = pesoInicial > pesoMeta;
    
    let pesoAlterado = 0;
    let pesoFalta = 0;
    let progresso = 0;

    if (isEmagrecimento) {
        document.getElementById('tituloMeta').innerText = "Meta de Emagrecimento 🎯";
        document.getElementById('labelAlcancado').innerText = "Perdidos";
        
        pesoAlterado = pesoInicial - pesoAtual;
        pesoFalta = pesoAtual - pesoMeta;
        
        if (pesoFalta < 0) pesoFalta = 0; 
        if (pesoAlterado < 0) pesoAlterado = 0; 
        
        const totalPerder = pesoInicial - pesoMeta;
        progresso = (pesoAlterado / totalPerder) * 100;

    } else {
        document.getElementById('tituloMeta').innerText = "Meta de Ganho de Massa 💪";
        document.getElementById('labelAlcancado').innerText = "Ganhos";
        
        pesoAlterado = pesoAtual - pesoInicial;
        pesoFalta = pesoMeta - pesoAtual;
        
        if (pesoFalta < 0) pesoFalta = 0;
        if (pesoAlterado < 0) pesoAlterado = 0;
        
        const totalGanhar = pesoMeta - pesoInicial;
        progresso = (pesoAlterado / totalGanhar) * 100;
    }

    progresso = Math.max(0, Math.min(progresso, 100));

    document.getElementById('pesoAlcancado').innerText = `${pesoAlterado.toFixed(1)} kg`;
    document.getElementById('pesoFalta').innerText = `${pesoFalta.toFixed(1)} kg`;
    
    const textoDesempenho = `
        <div style="display: flex; flex-direction: column; text-align: right; width: 100%;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 5px;">
                <span style="font-weight: bold; color: var(--text-main);">Desempenho:</span>
                <span style="font-size: 1.1em; font-weight: bold;">${progresso.toFixed(1)}%</span>
            </div>
            <span style="font-size: 0.8em; font-weight: normal; color: #888;">
                Atual: ${pesoAtual}kg ➔ Meta: ${pesoMeta}kg (Faltam: ${pesoFalta.toFixed(1)}kg)
            </span>
        </div>
    `;
    document.getElementById('porcentagemDesempenho').innerHTML = textoDesempenho;
    
    document.getElementById('telaFormulario').classList.add('hidden');
    document.getElementById('telaResultado').classList.remove('hidden');
    
    document.getElementById('barraProgresso').style.width = '0%';
    setTimeout(() => {
        document.getElementById('barraProgresso').style.width = `${progresso}%`;
    }, 100);
}

function voltar() {
    document.getElementById('telaResultado').classList.add('hidden');
    document.getElementById('telaFormulario').classList.remove('hidden');
}