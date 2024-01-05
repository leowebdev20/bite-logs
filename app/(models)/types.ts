import { Mood } from "@prisma/client";
import { Decimal } from "@prisma/client/runtime/library";

export interface IEntry {
    id: string;
    title: string;
    content: string;
    foods: string[];
    pain: Decimal;
    mood: Mood;
    createdAt: Date;
}

export interface IFoodListData {
    id: number;
    name: string;
    containing?: string[];
    facts: IFacts;
    calories: number;
    recipes?: boolean;
    ingredients: string[] | null;
    isSelected?: boolean | null;
}

export interface IFacts {
    protein: number;
    fat: number;
    carb: number;
}

export interface IPainListData {
    id: number;
    pain: number;
    description: string;
    isSelected?: boolean | null;
}

export interface IRecipe {
    id: string;
    title: string;
    content: string;
    foods: string[];
    pain: Decimal;
    mood: Mood;
    createdAt: Date;
}