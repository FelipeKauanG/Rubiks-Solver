from random import randint
import numpy as np


def scramble():
    while True:
        scramble = []
        remover = True
        while len(scramble) < 20:
            Movs = ["R","L", "U", "D", "F", "B"]
            Movs.pop(remover)
            current = randint(0, len(Movs)-1)
            par = randint(1, 2)
            while current == remover:
                current = randint(0, len(Movs)-1)
            plus = randint(1, 3)
            if plus == 1:
                mov = "'"+ Movs[current]
                scramble.append(mov)
            elif plus == 2:
                mov = "2"+Movs[current]
                scramble.append(mov)
            else:
                mov = Movs[current]
                scramble.append(mov)
            remover = current
        for mov in scramble:
            print(f"\033[36m{mov}\033[m ", end="")
        continuar = str(input("Continuar ?"))
        if continuar in "n":
            break



faces = []
atual = 1
for i in range(1, 37):
    cores = ['G', 'R', 'B', 'O']
    faces.append(cores[atual-1])
    atual += 1
    if atual > 4:
        atual = 1

scramble()
faces = np.array(faces).reshape(3, 12)
print(faces)
print(f"\033[31mFim do programinha :P\033[m")

