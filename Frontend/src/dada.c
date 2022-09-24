#include <stdio.h>
#include <string.h>
#include <stdlib.h>


struct PCB{
    char name[10];
    int arrivalTime;
    int duration;
    char priority[7];
    int tickets[3];
};

void swap(struct PCB * xp, struct PCB * yp)
{
    struct PCB temp = *xp;
    *xp = *yp;
    *yp = temp;
}

void print(struct PCB * head){
    fprintf(stdout, "%s,", head->name);
    fprintf(stdout, "%d,", head->arrivalTime);
    fprintf(stdout, "%d,", head->duration);
    fprintf(stdout, "%s", head->priority);
    fprintf(stdout, "\n");
}


int main() {
    int timestamp = 0;
    int totalTime = 0;
    int num;
    scanf("%d", &num);
    char buffer[14];
    struct PCB ** queue;
    char nameInp[10];
    char arrivalTimeInp[2];
    char durationInp[2];
    char priorityInp[7];
    queue = calloc(100, sizeof(struct PCB*));
    for(int i = 0; i < num ; i++){
        queue[i] = calloc(1, sizeof(struct PCB));
        scanf("%s", buffer);
        strcpy(nameInp, strtok(buffer, ":"));
        strcpy(queue[i]->name, nameInp);
        
        strcpy(arrivalTimeInp, strtok(NULL, ":"));
        queue[i]->arrivalTime = atoi(arrivalTimeInp);
        
        strcpy(durationInp, strtok(NULL, ":"));
        queue[i]->duration = atoi(durationInp);
        
        strcpy(priorityInp, strtok(NULL, ":"));
        strcpy(queue[i]->priority, priorityInp);
        if(strcmp(priorityInp, "low") == 0){
            
            queue[i]->tickets[0] = 0;
            queue[i]->tickets[1] = 0;
            queue[i]->tickets[2] = 1;
           
            
        }
        else if(strcmp(priorityInp, "normal") == 0){
            
            queue[i]->tickets[0] = 0;
            queue[i]->tickets[1] = 1;
            queue[i]->tickets[2] = 1;
           
            
        }
        else if (strcmp(priorityInp, "high") == 0){
            
            queue[i]->tickets[0] = 1;
            queue[i]->tickets[1] = 1;
            queue[i]->tickets[2] = 1;
           
            
        }
        
    }
    for(int j = 0; j < num; j++){
        totalTime += queue[j]->duration;
        //print(queue[j]);
    }
  //  printf("%d\n", totalTime);
    char current[10];
    srand(1);
    strcpy(current, "idle");
    //char queued[10];
    struct PCB ** activeQueue;
    activeQueue = calloc(100, sizeof(struct PCB*));
    //strcpy(queued, "empty");
    
    int processes = 0;
    while(1){
        int totalTickets = 0;
        timestamp += 1;
        for(int i = 0; i < num; i++){
            if(timestamp == queue[i]->arrivalTime){
                activeQueue[processes] = (queue[i]);
                //printf("%d\n", processes);
                processes++;
            }}
            //if(strcmp(current, "idle") == 0){
              //  strcpy(current, queue[i]->name);
            //}
        if(processes == 0){
                printf("%d:%s:empty\n", timestamp, current);
            }
        else {
                totalTickets = 0;
                for(int j = 0; j < processes; j++){
                    for(int k = 0; k < 3; k++)  {
                        totalTickets+= activeQueue[j]->tickets[k];
                        }  
                    }
                int r = rand() % totalTickets;
                int currentTotaltickets = 0;
                for(int j = 0; j < processes; j++){
                    for(int k = 0; k < 3; k++)  {
                        currentTotaltickets+= activeQueue[j]->tickets[k];
                        if(currentTotaltickets <= r){
                            int tempTime = activeQueue[j]->arrivalTime;
                            int tempDuration= activeQueue[j]->duration;
                            char tempName[10];
                            strcpy(tempName, activeQueue[j]->name);
                            char tempPriority[7];
                            strcpy(tempPriority, activeQueue[j]->priority);
                            int tempTickets[3];
                            tempTickets[0] = activeQueue[j]->tickets[0];
                            tempTickets[1] = activeQueue[j]->tickets[1];
                            tempTickets[2] = activeQueue[j]->tickets[2];
                            
                            activeQueue[j]->arrivalTime = activeQueue[0]->arrivalTime;
                            activeQueue[j]->duration = activeQueue[0]->duration;
                            strcpy(activeQueue[j]->name, activeQueue[0]->name);
                            strcpy(activeQueue[j]->priority, activeQueue[0]->priority);
                            activeQueue[j]->tickets[0] = activeQueue[0]->tickets[0];
                            activeQueue[j]->tickets[1] = activeQueue[0]->tickets[1];
                            activeQueue[j]->tickets[2] = activeQueue[0]->tickets[2];
                            
                            activeQueue[0]->arrivalTime = tempTime;
                            activeQueue[0]->duration = tempDuration;
                            strcpy(activeQueue[0]->name, tempName);
                            strcpy(activeQueue[0]->priority, tempPriority);
                            activeQueue[0]->tickets[0] = tempTickets[0];
                            activeQueue[0]->tickets[1] = tempTickets[1];
                            activeQueue[0]->tickets[2] = tempTickets[2];
                            
                            strcpy(current ,activeQueue[0]->name);
                            }
                        
                        }  
                    }
                printf("%d:%s:", timestamp, current);
                for(int i = 1; i < processes; i++){
                    printf("%s,", activeQueue[i]->name);
                    }
                printf("\n");
            activeQueue[0]->duration--;
            if(activeQueue[0]->duration ==0){
            for(int i = 1; i < processes; i++){
                activeQueue[i-1]->arrivalTime = activeQueue[i]->arrivalTime;
                activeQueue[i-1]->duration = activeQueue[i]->duration;
                strcpy(activeQueue[i-1]->name, activeQueue[i]->name);
                strcpy(activeQueue[i-1]->priority, activeQueue[i]->priority);
                activeQueue[i-1]->tickets[0] = activeQueue[i]->tickets[0];
                activeQueue[i-1]->tickets[1] = activeQueue[i]->tickets[1];
                activeQueue[i-1]->tickets[2] = activeQueue[i]->tickets[2];
            }
            strcpy(current,activeQueue[0]->name);
            processes--;
        }
            for (int i = 1; i < processes; i++){
                for (int j = 1; j < processes - i; j++){
                    if (activeQueue[j]->arrivalTime > activeQueue[j + 1]->arrivalTime){
                         swap(activeQueue[j], activeQueue[j + 1]);}}}
            }
        
    
                
                
        
        //printf("%d:%s:%s\n", timestamp, current, queued);
        if(timestamp > totalTime){
            break;
        }
    }
    
    return 0;
}