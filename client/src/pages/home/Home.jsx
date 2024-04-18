import React from "react";
import "./home.css";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Image from "../../assets/hero.png";
import logo from "../../assets/logo.jpg";
import { Link } from "react-router-dom";
import { heroIcons } from "../../utils/icons";
import route from "../../assets/route.png";
import { AccordionItem } from "../../components";

const Home = () => {
    return (
        <div className="h-full bg-red-700">
            <section className="bg-white dark:bg-gray-900">
                <div className="grid max-w-screen-xl px-4 pt-20 pb-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12 lg:pt-5">
                    <div className="mr-auto place-self-center lg:col-span-7">
                        <h1 className="max-w-2xl mb-4 text-4xl font-extrabold leading-none tracking-tight md:text-5xl xl:text-6xl dark:text-white">
                            Bienvenue sur
                            <br />
                            AutoCompagnon.
                        </h1>
                        <p className="max-w-2xl mb-6 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl dark:text-gray-400">
                            votre destination de choix pour une éducation à la
                            conduite sûre et fiable. Que vous soyez débutant,
                            désireux d'obtenir votre premier permis de conduire,
                            ou que vous souhaitiez perfectionner vos compétences
                            au volant, nous sommes là pour vous accompagner à
                            chaque étape.
                        </p>
                    </div>
                    <div className="hidden lg:mt-0 lg:col-span-5 lg:flex">
                        <img src={Image} alt="hero image" />
                    </div>
                </div>
            </section>
            <section className="bg-white dark:bg-gray-900">
                <div className="max-w-screen-xl px-4 pb-8 mx-auto lg:pb-16">
                    <div className="grid grid-cols-2 gap-2 text-gray-500 sm:gap-12 sm:grid-cols-3 lg:grid-cols-10 dark:text-gray-400">
                        {heroIcons.map((icon, idx) => (
                            <div
                                key={idx}
                                href="#"
                                className="flex items-center lg:justify-center">
                                <span className="hover:text-gray-900 dark:hover:text-white bg-white h-full w-full flex justify-center p-3 rounded-full shadow-lg border border-gray-200">
                                    <img
                                        src={icon}
                                        alt="icon"
                                        className="h-[4rem] w-[4rem]"
                                    />
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
            <section className="bg-white dark:bg-gray-900">
                <div className="items-center max-w-screen-xl px-4 py-8 mx-auto lg:grid lg:grid-cols-4 lg:gap-16 xl:gap-24 lg:py-24 lg:px-6">
                    <div className="col-span-2 mb-8">
                        <p className="text-lg font-medium text-purple-600 dark:text-purple-500">
                            Trusted Worldwide
                        </p>
                        <h2 className="mt-3 mb-4 text-3xl font-extrabold tracking-tight text-gray-900 md:text-3xl dark:text-white">
                            Trusted by over 600 million users and 10,000 teams
                        </h2>
                        <p className="font-light text-gray-500 sm:text-xl dark:text-gray-400">
                            Our rigorous security and compliance standards are
                            at the heart of all we do. We work tirelessly to
                            protect you and your customers.
                        </p>
                    </div>
                    <div className="col-span-2 space-y-8 md:grid md:grid-cols-2 md:gap-12 md:space-y-0">
                        <div>
                            <svg
                                className="w-10 h-10 mb-2 text-purple-600 md:w-12 md:h-12 dark:text-purple-500"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                                xmlns="http://www.w3.org/2000/svg">
                                <path
                                    fill-rule="evenodd"
                                    d="M2 5a2 2 0 012-2h12a2 2 0 012 2v2a2 2 0 01-2 2H4a2 2 0 01-2-2V5zm14 1a1 1 0 11-2 0 1 1 0 012 0zM2 13a2 2 0 012-2h12a2 2 0 012 2v2a2 2 0 01-2 2H4a2 2 0 01-2-2v-2zm14 1a1 1 0 11-2 0 1 1 0 012 0z"
                                    clip-rule="evenodd"></path>
                            </svg>
                            <h3 className="mb-2 text-xl font-bold dark:text-white">
                                Disponible 24/7
                            </h3>
                            <p className="font-light text-gray-500 dark:text-gray-400">
                                pour vous accompagner sur la route de la
                                réussite.
                            </p>
                        </div>
                        <div>
                            <svg
                                className="w-10 h-10 mb-2 text-purple-600 md:w-12 md:h-12 dark:text-purple-500"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                                xmlns="http://www.w3.org/2000/svg">
                                <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z"></path>
                            </svg>
                            <h3 className="mb-2 text-xl font-bold dark:text-white">
                                Les Experts de la Conduite
                            </h3>
                            <p className="font-light text-gray-500 dark:text-gray-400">
                                guidé par notre équipe d'instructeurs hautement
                                qualifiés.
                            </p>
                        </div>
                        <div>
                            <svg
                                className="w-10 h-10 mb-2 text-purple-600 md:w-12 md:h-12 dark:text-purple-500"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                                xmlns="http://www.w3.org/2000/svg">
                                <path
                                    fill-rule="evenodd"
                                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM4.332 8.027a6.012 6.012 0 011.912-2.706C6.512 5.73 6.974 6 7.5 6A1.5 1.5 0 019 7.5V8a2 2 0 004 0 2 2 0 011.523-1.943A5.977 5.977 0 0116 10c0 .34-.028.675-.083 1H15a2 2 0 00-2 2v2.197A5.973 5.973 0 0110 16v-2a2 2 0 00-2-2 2 2 0 01-2-2 2 2 0 00-1.668-1.973z"
                                    clip-rule="evenodd"></path>
                            </svg>
                            <h3 className="mb-2 text-2xl font-bold dark:text-white">
                                100+ countries
                            </h3>
                            <p className="font-light text-gray-500 dark:text-gray-400">
                                Have used Landwind to create functional websites
                            </p>
                        </div>
                        <div>
                            <svg
                                className="w-10 h-10 mb-2 text-purple-600 md:w-12 md:h-12 dark:text-purple-500"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                                xmlns="http://www.w3.org/2000/svg">
                                <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z"></path>
                            </svg>
                            <h3 className="mb-2 text-2xl font-bold dark:text-white">
                                5+ Million
                            </h3>
                            <p className="font-light text-gray-500 dark:text-gray-400">
                                Transactions per day
                            </p>
                        </div>
                    </div>
                </div>
            </section>
            <section className="bg-gray-50 dark:bg-gray-800">
                <div className="max-w-screen-xl px-4 py-8 mx-auto text-center lg:py-24 lg:px-6">
                    <figure className="max-w-screen-md mx-auto">
                        <svg
                            className="h-12 mx-auto mb-3 text-gray-400 dark:text-gray-600"
                            viewBox="0 0 24 27"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M14.017 18L14.017 10.609C14.017 4.905 17.748 1.039 23 0L23.995 2.151C21.563 3.068 20 5.789 20 8H24V18H14.017ZM0 18V10.609C0 4.905 3.748 1.038 9 0L9.996 2.151C7.563 3.068 6 5.789 6 8H9.983L9.983 18L0 18Z"
                                fill="currentColor"
                            />
                        </svg>
                        <blockquote>
                            <p className="text-xl font-medium text-gray-900 md:text-2xl dark:text-white">
                                "Nous vous offrons le soutien et les
                                connaissances nécessaires pour atteindre de
                                nouveaux sommets dans votre maîtrise du code de
                                la route. Avec notre expertise et notre
                                engagement, nous vous préparons à surmonter
                                chaque défi sur la route avec assurance."
                            </p>
                        </blockquote>
                    </figure>
                </div>
            </section>
            <section className="bg-white dark:bg-gray-900">
                <div className="max-w-screen-xl px-4 py-8 mx-auto lg:py-24 lg:px-6">
                    <div className="max-w-screen-md mx-auto mb-8 text-center lg:mb-12">
                        <h2 className="mb-4 text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white">
                            Équipe de Formation à la Conduite
                        </h2>
                        <p className="mb-5 font-light text-gray-500 sm:text-xl dark:text-gray-400">
                            Une équipe dédiée à l'apprentissage et à la sécurité
                            routière, guidant les futurs conducteurs à chaque
                            étape de leur parcours vers la réussite.
                        </p>
                    </div>
                    <div className="space-y-8 lg:grid lg:grid-cols-3 sm:gap-6 xl:gap-10 lg:space-y-0">
                        <div className="flex flex-col max-w-lg p-6 mx-auto text-center text-gray-900 bg-white border border-gray-100 rounded-lg shadow dark:border-gray-600 xl:p-8 dark:bg-gray-800 dark:text-white">
                            <h3 className="mb-4 text-2xl font-semibold">
                                Admin
                            </h3>
                            <p className="font-light text-gray-500 sm:text-lg dark:text-gray-400">
                                gère les opérations administratives et veille au
                                bon fonctionnement global de l'auto-école.
                            </p>
                            <div className="flex items-baseline justify-center my-8"></div>
                            <ul
                                role="list"
                                className="mb-8 space-y-4 text-left">
                                <li className="flex items-center space-x-3">
                                    <svg
                                        className="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400"
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                        xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            fill-rule="evenodd"
                                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                            clip-rule="evenodd"></path>
                                    </svg>
                                    <span>Individual configuration</span>
                                </li>
                                <li className="flex items-center space-x-3">
                                    <svg
                                        className="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400"
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                        xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            fill-rule="evenodd"
                                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                            clip-rule="evenodd"></path>
                                    </svg>
                                    <span>No setup, or hidden fees</span>
                                </li>
                                <li className="flex items-center space-x-3">
                                    <svg
                                        className="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400"
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                        xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            fill-rule="evenodd"
                                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                            clip-rule="evenodd"></path>
                                    </svg>
                                    <span>
                                        Team size:{" "}
                                        <span className="font-semibold">
                                            1 developer
                                        </span>
                                    </span>
                                </li>
                                <li className="flex items-center space-x-3">
                                    <svg
                                        className="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400"
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                        xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            fill-rule="evenodd"
                                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                            clip-rule="evenodd"></path>
                                    </svg>
                                    <span>
                                        Premium support:{" "}
                                        <span className="font-semibold">
                                            6 months
                                        </span>
                                    </span>
                                </li>
                                <li className="flex items-center space-x-3">
                                    <svg
                                        className="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400"
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                        xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            fill-rule="evenodd"
                                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                            clip-rule="evenodd"></path>
                                    </svg>
                                    <span>
                                        Free updates:{" "}
                                        <span className="font-semibold">
                                            6 months
                                        </span>
                                    </span>
                                </li>
                            </ul>
                            <a
                                href="#"
                                className="text-white bg-purple-600 hover:bg-purple-700 focus:ring-4 focus:ring-purple-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:text-white  dark:focus:ring-purple-900">
                                Get started
                            </a>
                        </div>
                        <div className="flex flex-col max-w-lg p-6 mx-auto text-center text-gray-900 bg-white border border-gray-100 rounded-lg shadow dark:border-gray-600 xl:p-8 dark:bg-gray-800 dark:text-white">
                            <h3 className="mb-4 text-2xl font-semibold">
                                Sécretaire
                            </h3>
                            <p className="font-light text-gray-500 sm:text-lg dark:text-gray-400">
                                assure l'accueil des clients, la gestion des
                                plannings et des rendez-vous de l'auto-école.
                            </p>
                            <div className="flex items-baseline justify-center my-8"></div>
                            <ul
                                role="list"
                                className="mb-8 space-y-4 text-left">
                                <li className="flex items-center space-x-3">
                                    <svg
                                        className="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400"
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                        xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            fill-rule="evenodd"
                                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                            clip-rule="evenodd"></path>
                                    </svg>
                                    <span>Individual configuration</span>
                                </li>
                                <li className="flex items-center space-x-3">
                                    <svg
                                        className="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400"
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                        xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            fill-rule="evenodd"
                                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                            clip-rule="evenodd"></path>
                                    </svg>
                                    <span>No setup, or hidden fees</span>
                                </li>
                                <li className="flex items-center space-x-3">
                                    <svg
                                        className="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400"
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                        xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            fill-rule="evenodd"
                                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                            clip-rule="evenodd"></path>
                                    </svg>
                                    <span>
                                        Team size:{" "}
                                        <span className="font-semibold">
                                            10 developers
                                        </span>
                                    </span>
                                </li>
                                <li className="flex items-center space-x-3">
                                    <svg
                                        className="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400"
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                        xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            fill-rule="evenodd"
                                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                            clip-rule="evenodd"></path>
                                    </svg>
                                    <span>
                                        Premium support:{" "}
                                        <span className="font-semibold">
                                            24 months
                                        </span>
                                    </span>
                                </li>
                                <li className="flex items-center space-x-3">
                                    <svg
                                        className="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400"
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                        xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            fill-rule="evenodd"
                                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                            clip-rule="evenodd"></path>
                                    </svg>
                                    <span>
                                        Free updates:{" "}
                                        <span className="font-semibold">
                                            24 months
                                        </span>
                                    </span>
                                </li>
                            </ul>
                            <a
                                href="#"
                                className="text-white bg-purple-600 hover:bg-purple-700 focus:ring-4 focus:ring-purple-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:text-white  dark:focus:ring-purple-900">
                                Get started
                            </a>
                        </div>
                        <div className="flex flex-col max-w-lg p-6 mx-auto text-center text-gray-900 bg-white border border-gray-100 rounded-lg shadow dark:border-gray-600 xl:p-8 dark:bg-gray-800 dark:text-white">
                            <h3 className="mb-4 text-2xl font-semibold">
                                Moniteur
                            </h3>
                            <p className="font-light text-gray-500 sm:text-lg dark:text-gray-400">
                                dispense des cours de conduite pratiques et
                                théoriques, guidant les élèves dans
                                l'apprentissage des règles de conduite.
                            </p>
                            <div className="flex items-baseline justify-center my-8"></div>
                            <ul
                                role="list"
                                className="mb-8 space-y-4 text-left">
                                <li className="flex items-center space-x-3">
                                    <svg
                                        className="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400"
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                        xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            fill-rule="evenodd"
                                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                            clip-rule="evenodd"></path>
                                    </svg>
                                    <span>Individual configuration</span>
                                </li>
                                <li className="flex items-center space-x-3">
                                    <svg
                                        className="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400"
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                        xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            fill-rule="evenodd"
                                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                            clip-rule="evenodd"></path>
                                    </svg>
                                    <span>No setup, or hidden fees</span>
                                </li>
                                <li className="flex items-center space-x-3">
                                    <svg
                                        className="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400"
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                        xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            fill-rule="evenodd"
                                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                            clip-rule="evenodd"></path>
                                    </svg>
                                    <span>
                                        Team size:{" "}
                                        <span className="font-semibold">
                                            100+ developers
                                        </span>
                                    </span>
                                </li>
                                <li className="flex items-center space-x-3">
                                    <svg
                                        className="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400"
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                        xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            fill-rule="evenodd"
                                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                            clip-rule="evenodd"></path>
                                    </svg>
                                    <span>
                                        Premium support:{" "}
                                        <span className="font-semibold">
                                            36 months
                                        </span>
                                    </span>
                                </li>
                                <li className="flex items-center space-x-3">
                                    <svg
                                        className="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400"
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                        xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            fill-rule="evenodd"
                                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                            clip-rule="evenodd"></path>
                                    </svg>
                                    <span>
                                        Free updates:{" "}
                                        <span className="font-semibold">
                                            36 months
                                        </span>
                                    </span>
                                </li>
                            </ul>
                            <a
                                href="#"
                                className="text-white bg-purple-600 hover:bg-purple-700 focus:ring-4 focus:ring-purple-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:text-white  dark:focus:ring-purple-900">
                                Get started
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            <section className="bg-white dark:bg-gray-900">
                <div className="max-w-screen-xl px-4 pb-8 mx-auto lg:pb-24 lg:px-6 ">
                    <h2 className="mb-6 text-3xl font-extrabold tracking-tight text-center text-gray-900 lg:mb-8 lg:text-3xl dark:text-white">
                        Questions fréquemment posées
                    </h2>
                    <div className="max-w-screen-md mx-auto">
                        <div
                            id="accordion-flush"
                            data-accordion="collapse"
                            data-active-classNamees="bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
                            data-inactive-classNamees="text-gray-500 dark:text-gray-400">
                            <AccordionItem
                                question="Quels sont les documents nécessaires pour s'inscrire à l'auto-école?"
                                answer={
                                    <div>
                                        <p className="mb-2 text-gray-500 dark:text-gray-400">
                                            Les documents requis varient selon
                                            votre situation et le type de permis
                                            que vous souhaitez obtenir. En
                                            général, vous aurez besoin de votre
                                            pièce d'identité, d'une photo
                                            d'identité récente, d'un
                                            justificatif de domicile et,
                                            éventuellement, d'autres documents
                                            selon les exigences de l'auto-école.
                                        </p>
                                    </div>
                                }
                            />
                            <h3 id="accordion-flush-heading-2">
                                <AccordionItem
                                    question="Quelle est la durée moyenne de la formation pour obtenir le permis de conduire?"
                                    answer={
                                        <div>
                                            <p className="mb-2 text-gray-500 dark:text-gray-400">
                                                La durée de la formation dépend
                                                de plusieurs facteurs, tels que
                                                votre expérience antérieure en
                                                conduite, la fréquence de vos
                                                leçons et votre aptitude à
                                                assimiler les compétences
                                                requises. En moyenne, la
                                                formation peut prendre plusieurs
                                                mois, mais cela peut varier d'un
                                                individu à l'autre.
                                            </p>
                                        </div>
                                    }
                                />
                            </h3>

                            <h3 id="accordion-flush-heading-3">
                                <AccordionItem
                                    question="Quels sont les avantages de passer le permis de conduire avec votre auto-école?"
                                    answer={
                                        <div>
                                            <p className="mb-2 text-gray-500 dark:text-gray-400">
                                                Notre auto-école offre une
                                                formation de haute qualité
                                                dispensée par des instructeurs
                                                expérimentés. Nous nous
                                                engageons à vous préparer non
                                                seulement à passer l'examen de
                                                conduite, mais aussi à devenir
                                                un conducteur sûr et responsable
                                                sur la route. De plus, nous
                                                offrons un horaire flexible pour
                                                répondre à vos besoins.
                                            </p>
                                        </div>
                                    }
                                />
                            </h3>

                            <h3 id="accordion-flush-heading-4">
                                <AccordionItem
                                    question="Y a-t-il des cours de conduite spécifiques pour les débutants?"
                                    answer={
                                        <div>
                                            <p className="mb-2 text-gray-500 dark:text-gray-400">
                                                Oui, nous proposons des cours
                                                spécialement conçus pour les
                                                débutants afin de leur enseigner
                                                les bases de la conduite en
                                                toute sécurité. Nos instructeurs
                                                sont patients et compréhensifs,
                                                et ils vous guideront à travers
                                                chaque étape du processus
                                                d'apprentissage, de la
                                                manipulation du volant à la
                                                compréhension des règles de la
                                                circulation.
                                            </p>
                                        </div>
                                    }
                                />
                            </h3>
                        </div>
                    </div>
                </div>
            </section>

            <footer className="bg-white dark:bg-gray-800">
                <div className="max-w-screen-xl p-4 py-6 mx-auto lg:py-16 md:p-8 lg:p-10">
                    {/* <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-5" /> */}
                    <div className="text-center">
                        <a
                            href="#"
                            className="flex items-center justify-center mb-5 text-2xl font-semibold text-gray-900 dark:text-white">
                            <img
                                src={logo}
                                className="h-6 mr-3 sm:h-9 rounded-full"
                                alt="Landwind Logo"
                            />
                            Autocompagnon
                        </a>
                        <span className="block text-sm text-center text-gray-500 dark:text-gray-400">
                            © 2023-2024 Autocompagnon. Tous droits réservés.
                            Réalisé avec{" "}
                            <a
                                href="#"
                                className="text-purple-600 hover:underline dark:text-purple-500">
                                Autocompagnon
                            </a>
                        </span>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default Home;
