export interface UserLogData {
    bedTime?: Date,
    wakeUpTime?: Date,
    sleepDurationMinutes?: number,
    breakfast?: boolean,
    lunch?: boolean,
    dinner?: boolean,
    waterIntake?: number,
    exerciseDurationInMinutes?: number,
    meditated?: boolean,
    gratitudes?: string[],
    priorities?: string[],
  };

export interface LogFormProps {
    prevUserLog: UserLogData,
    updateUserLog: Dispatch<SetStateAction<UserLogData>>,
    currentFormState: boolean,
    updateLogFormState: (index: number, save: boolean) => boolean,
    formIndex: number,
}