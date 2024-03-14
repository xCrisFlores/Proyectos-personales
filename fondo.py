import cv2
import numpy as np
import random as rd

detector = cv2.CascadeClassifier(cv2.data.haarcascades + 'haarcascade_eye.xml')

tape = cv2.imread("tape.png", cv2.IMREAD_UNCHANGED)
logo = cv2.imread("logo.png", cv2.IMREAD_UNCHANGED)

cap = cv2.VideoCapture(0)

while True:
    ret, frame = cap.read()
    frame_gris = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
    frame = cv2.cvtColor(frame, cv2.COLOR_BGR2BGRA)  
    frame = cv2.flip(frame, 1)

    ojos = detector.detectMultiScale(
        frame_gris, 
        scaleFactor=1.1,
        minNeighbors=5,
    )

    x_min = y_min = float('inf')
    x_max = y_max = 0

    for (x, y, w, h) in ojos:
        x_min = min(x_min, x)
        y_min = min(y_min, y)
        x_max = max(x_max, x + w)
        y_max = max(y_max, y + h)

    if x_max > x_min and y_max > y_min:
        w = x_max - x_min
        h = y_max - y_min

        tape_fix = cv2.resize(tape, (w, h))

        for i in range(tape_fix.shape[0]):
            for j in range(tape_fix.shape[1]):
                if (tape_fix[i, j, 3] != 0):  
                    frame[y_min + i, x_min + j] = tape_fix[i, j]
                    
        logo_fix = cv2.resize(logo, (w, h))
        
        ylogo = y_min  * (8/10)
        
        ylogo = round(ylogo)
        
        for i in range(logo_fix.shape[0]):
            for j in range(logo_fix.shape[1]):
                if logo_fix[i, j, 3] != 0:  
                    frame[y_min + i - ylogo, x_min + j] = logo_fix[i, j]
                  
        frame_final = frame.copy()

        filas, columnas, canales = frame_final.shape
        for _ in range(15000):
            filard = rd.randint(0, filas-1)
            columnard = rd.randint(0, columnas-1)
            for canal in range(canales):
                frame_final[filard, columnard, canal] = rd.randint(0, 255)

        filtro = np.zeros_like(frame, dtype=np.uint8)

       
        filtro[:, :, 0] = 50  
        filtro[:, :, 1] = 60   
        filtro[:, :, 2] = 220  
        filtro[:, :, 3] = 100  
        frame_filtro = cv2.addWeighted(filtro, 0.8, frame_final, 1, 0)
        
        cv2.imshow('Video', frame_filtro)
    if cv2.waitKey(1) & 0xFF == ord('q'):
        break

cap.release()
cv2.destroyAllWindows()
