# Задание №4

Реализация двухпользовательского или многопользовательского чата с использованием протокола TCP с помощью библиотеки socket и threading.

## Клиент

```
import socket
import threading

server_address = input("Enter server address: ")

client_socket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)

client_socket.connect((server_address, 12345))

client_name = input("Enter your name: ")

client_socket.send(client_name.encode())

def receive():
    while True:
        try:
            message = client_socket.recv(1024).decode()
            print(message)
        except:
            break

def send():
    while True:
        message = input()
        client_socket.send(message.encode())

receive_thread = threading.Thread(target=receive)
send_thread = threading.Thread(target=send)

receive_thread.start()
send_thread.start()
```

## Сервер

```
import socket
import threading

server_socket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
server_address = ('localhost', 12345)

server_socket.bind(server_address)

server_socket.listen(5)
print("Server is running on {}:{}".format(*server_address))

clients = []

def handle_client(client_socket, client_address):
    client_name = client_socket.recv(1024).decode()
    print("New connection from {}: {} joined".format(client_address[0], client_name))

    clients.append((client_socket, client_name))

    while True:
        try:
            message = client_socket.recv(1024).decode()

            if not message:
                break

            for client in clients:
                if client[0] != client_socket:
                    client[0].send("{}: {}".format(client_name, message).encode())
        except ConnectionResetError:
            break

    clients.remove((client_socket, client_name))
    print("Connection closed from {}: {}".format(client_address[0], client_name))

while True:
    client_socket, client_address = server_socket.accept()

    client_thread = threading.Thread(target=handle_client, args=(client_socket, client_address))
    client_thread.start()
```

## Результат

Сервер:
<figure>
  <img src="7.png" width="300" />
</figure>

Клиент: 
<figure>
  <img src="6.png" width="300" />
</figure>

В данной реализации создается серверная часть, который принимает подключения от клиентов и отправляет сообщения всем пользователям через потоки. Клиентская часть подключается к серверу, указанному адресу и отправляет имя пользователя серверу. Клиент может отправлять и принимать сообщения от других пользователей чата. Используются библиотеки socket и threading для обмена сообщениями и работы с потоками.