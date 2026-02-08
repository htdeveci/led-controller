// export const SERVER_URL = "http://192.168.1.4/";
export const LINE_HEIGHT = 50;
export const LOCAL_STORAGE_SERVER_INFO = "serverInfo";
export const LED_ESP_ENUM = Object.freeze({
    BatLamp: { ledId: 0, espId: 0 },
    TvStand: { ledId: 0, espId: 1 },
    BookshelfBottom: { ledId: 1, espId: 1 },
    BookshelfShort: { ledId: 2, espId: 1 },
    BookshelfMiddle: { ledId: 3, espId: 1 },
    BookshelfTop: { ledId: 4, espId: 1 },
    AllLeds: { ledId: 100, espId: 100 },
    Bookshelf: { ledId: 101, espId: 1 }
});
export const LED_MODES = {
    Static: "Static",
    Split: "Split",
    Loop: "Loop",
    Breath: "Breath",
};