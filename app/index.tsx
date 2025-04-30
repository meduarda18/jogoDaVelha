import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {useEffect, useState} from "react";

export default function Index() {
  const [vitoriasX, setVitoriasX] = useState(0);
  const [vitoriasO, setVitoriasO] = useState(0);

  const [tabuleiro, setTabuleiro] = useState(Array(9).fill(null));

  const [jogadorDaVez, setJogadorDaVez] = useState("X");

  useEffect(() => {
      const vencedor = verificarVencedor(tabuleiro);
      if(vencedor){
          if(vencedor == "X"){
              setVitoriasX(vitoriasX+1);
          } else if(vencedor == "O"){
              setVitoriasO(vitoriasO+1);
          }
          reiniciarTabuleiro();
      }else if(!tabuleiro.includes(null)){
          reiniciarTabuleiro();
      }

  }, [tabuleiro]);

  const clicar = (index: any) => {
      if(tabuleiro[index] == null){
          const novoTabuleiro = [...tabuleiro];
          novoTabuleiro[index] = jogadorDaVez;
          setTabuleiro(novoTabuleiro);

          if(jogadorDaVez == "X"){
              setJogadorDaVez("O");
          }else{
              setJogadorDaVez("X");
          }
      }
  }

  const verificarVencedor = (tab: any) => {
      const combinacoes = [
          [0,1,2],
          [3, 4, 5],
          [6, 7, 8],
          [0, 3, 6],
          [1, 4, 7],
          [2, 5, 8],
          [0, 4, 8],
          [2, 4, 6],
      ];

      for(let combo of combinacoes){
          const [a,b,c] = combo;
          if(tab[a] && tab[a] == tab[b] && tab[b] == tab[c]){
              return tab[a];
          }
      }
      return null;
  }

    const reiniciarTabuleiro = () => {
        setTimeout(() => {
            setTabuleiro(Array(9).fill(null));
            setJogadorDaVez("X");
        }, 1000);
    };

  return (
    <View style={style.container}>
        <Text style={style.score}>Jogador X: {vitoriasX}</Text>
        <Text style={style.score}>Jogador O: {vitoriasO}</Text>
        <Text style={style.turn}>Vez de: {jogadorDaVez}</Text>
        <View style={style.board}>
            {tabuleiro.map((valor, index) =>(
                <TouchableOpacity
                    key={index}
                    style={style.cell}
                    onPress={() => clicar(index)}
                >
                    <Text style={style.cellText}>{valor}</Text>
                </TouchableOpacity>
            ))}
        </View>
    </View>
  );
}

const style = StyleSheet.create({
    container: {
        alignItems: "center",
        justifyContent: "center",
        flex: 1,
        backgroundColor: "#fff",
    },
    title: {
        fontSize: 32,
        fontWeight: "bold",
        marginBottom: 20,
    },
    score: {
        fontSize: 20,
    },
    turn: {
        fontSize: 18,
        marginTop: 10,
        marginBottom: 20,
    },
    board: {
        width: 300,
        height: 300,
        flexDirection: "row",
        flexWrap: "wrap",
    },
    cell: {
        width: "33.33%",
        height: "33.33%",
        borderWidth: 1,
        borderColor: "#000",
        alignItems: "center",
        justifyContent: "center",
    },
    cellText: {
        fontSize: 36,
        fontWeight: "bold",
    },
})
