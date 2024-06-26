const dt = luxon.DateTime;

const randomAnswers = [
  "La felicità è un viaggio, non una destinazione.",
  "Va bene",
  "La vita è troppo breve per sprecarla a preoccuparsi. Vivi ogni momento al massimo!",
  "La gentilezza è un linguaggio universale che può essere compreso da tutti.",
  "Bello!",
  "Perfetto",
  "Grazie!",
  "Le montagne non si scalano semplicemente con la forza, ma con la determinazione.",
  "Non aspettare il momento perfetto, prendi il momento e rendilo perfetto.",
  "Sii la versione migliore di te stesso ogni giorno.",
];

function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const { createApp } = Vue;

createApp({
  data() {
    return {
      selectedContact: 0,
      statusUpdate: "Ultimo accesso oggi alle 16:26",
      textMessage: "",
      newMessageSent: {
        date: "",
        message: "",
        status: "sent",
      },
      newMessageReceived: {
        date: "",
        message: "",
        status: "received",
      },
      searchText: "",
      contacts: [
        {
          name: "Michele",
          avatar: "_1",
          visible: true,
          messages: [
            {
              date: "10/01/2020 15:30:55",
              message: "Hai portato a spasso il cane?",
              status: "sent",
            },
            {
              date: "10/01/2020 15:50:00",
              message: "Ricordati di stendere i panni",
              status: "sent",
            },
            {
              date: "10/01/2020 16:15:22",
              message: "Tutto fatto!",
              status: "received",
            },
          ],
        },
        {
          name: "Fabio",
          avatar: "_2",
          visible: true,
          messages: [
            {
              date: "20/03/2020 16:30:00",
              message: "Ciao come stai?",
              status: "sent",
            },
            {
              date: "20/03/2020 16:30:55",
              message: "Bene grazie! Stasera ci vediamo?",
              status: "received",
            },
            {
              date: "20/03/2020 16:35:00",
              message: "Mi piacerebbe ma devo andare a fare la spesa.",
              status: "sent",
            },
          ],
        },
        {
          name: "Samuele",
          avatar: "_3",
          visible: true,
          messages: [
            {
              date: "28/03/2020 10:10:40",
              message: "La Marianna va in campagna",
              status: "received",
            },
            {
              date: "28/03/2020 10:20:10",
              message: "Sicuro di non aver sbagliato chat?",
              status: "sent",
            },
            {
              date: "28/03/2020 16:15:22",
              message: "Ah scusa!",
              status: "received",
            },
          ],
        },
        {
          name: "Alessandro B.",
          avatar: "_4",
          visible: true,
          messages: [
            {
              date: "10/01/2020 15:30:55",
              message: "Lo sai che ha aperto una nuova pizzeria?",
              status: "sent",
            },
            {
              date: "10/01/2020 15:50:00",
              message: "Si, ma preferirei andare al cinema",
              status: "received",
            },
          ],
        },
        {
          name: "Alessandro L.",
          avatar: "_5",
          visible: true,
          messages: [
            {
              date: "10/01/2020 15:30:55",
              message: "Ricordati di chiamare la nonna",
              status: "sent",
            },
            {
              date: "10/01/2020 15:50:00",
              message: "Va bene, stasera la sento",
              status: "received",
            },
          ],
        },
        {
          name: "Claudia",
          avatar: "_6",
          visible: true,
          messages: [
            {
              date: "10/01/2020 15:30:55",
              message: "Ciao Claudia, hai novità?",
              status: "sent",
            },
            {
              date: "10/01/2020 15:50:00",
              message: "Non ancora",
              status: "received",
            },
            {
              date: "10/01/2020 15:51:00",
              message: "Nessuna nuova, buona nuova",
              status: "sent",
            },
          ],
        },
        {
          name: "Federico",
          avatar: "_7",
          visible: true,
          messages: [
            {
              date: "10/01/2020 15:30:55",
              message: "Fai gli auguri a Martina che è il suo compleanno!",
              status: "sent",
            },
            {
              date: "10/01/2020 15:50:00",
              message: "Grazie per avermelo ricordato, le scrivo subito!",
              status: "received",
            },
          ],
        },
        {
          name: "Davide",
          avatar: "_8",
          visible: true,
          messages: [
            {
              date: "10/01/2020 15:30:55",
              message: "Ciao, andiamo a mangiare la pizza stasera?",
              status: "received",
            },
            {
              date: "10/01/2020 15:50:00",
              message: "No, l'ho già mangiata ieri, ordiniamo sushi!",
              status: "sent",
            },
            {
              date: "10/01/2020 15:51:00",
              message: "OK!!",
              status: "received",
            },
          ],
        },
      ],
    };
  },
  methods: {
    handleContact: function (selectedIndex) {
      console.log(selectedIndex);
      this.selectedContact = selectedIndex;
    },
    getNewMessage: function () {
      console.log(this.textMessage);
      this.newMessageSent.message = this.textMessage.trim();
      this.newMessageSent.date = this.checkTime();
      console.log(this.newMessageSent);
      this.contacts[this.selectedContact].messages.push(this.newMessageSent);
      this.textMessage = "";
      this.newMessageSent = {
        date: "",
        message: "",
        status: "sent",
      };
      setTimeout(() => {
        this.statusUpdate = "sta scrivendo...";
        console.log("test timeout");
        this.newMessageReceived.date = this.checkTime();
        this.newMessageReceived.message = this.getRandomAnswer();
        this.contacts[this.selectedContact].messages.push(
          this.newMessageReceived
        );
      }, "1000");
      setTimeout(() => {
        this.statusUpdate = "online";
      }, "3000");
      setTimeout(() => {
        this.statusUpdate = `Ultimo accesso alle ${dt
          .now()
          .setLocale("it")
          .toLocaleString(dt.TIME_24_SIMPLE)}`;
      }, "5000");
    },
    searchChat: function (searchedText) {
      console.log(searchedText);
      this.contacts.forEach((searchedContact) => {
        if (
          searchedContact.name
            .toLowerCase()
            .includes(searchedText.toLowerCase())
        ) {
          searchedContact.visible = true;
        } else {
          searchedContact.visible = false;
        }
      });
    },
    deleteMessage: function (selectedMessage) {
      console.log(selectedMessage);
      console.log(
        this.contacts[this.selectedContact].messages[selectedMessage]
      );
      this.contacts[this.selectedContact].messages.splice(selectedMessage, 1);
    },
    checkTime: function () {
      const now = dt
        .now()
        .setLocale("it")
        .toLocaleString(dt.DATETIME_SHORT_WITH_SECONDS);
      console.log(now);
      return now;
    },
    getRandomAnswer: function () {
      const newAnswer = randomAnswers[getRndInteger(0, 9)];
      return newAnswer;
    },
  },
}).mount("#app");
