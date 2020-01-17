import { ModalTypeEnum } from '../enums/modal-type-enum';

export class ModalModel {
    public displayTitle: boolean;
    public displayBody: boolean;
    public displayButton: boolean;
    public title: string;
    public body: string;
    public buttonText: string;
    public type: ModalTypeEnum;
}