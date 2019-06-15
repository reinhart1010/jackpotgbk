# Jackpot GBK

This README is written in English, jadi kalau kamu mau lihat versi Bahasa Indonesianya kunjungi https://reinhart1010.github.io/jackpotgbk atau https://reinhart1010.gitlab.io/jackpotgbk.

Please apologize if you were unable to read the above text.

This repository contains source code for Jackpot GBK, which is hosted on [GitHub](https://github.com/reinhart1010/jackpotgbk) and [GitLab](https://github.com/reinhart1010/jackpotgbk) respectively.

# Bugs / Issues

You are able to post new issues in "Issues" section of this repository. Since it is currently not possible to sync between GitHub and GitLab issues (without using bots and respective APIs), some reports may be tagged duplicate to both sites.

# About This Game

This is a simple game of jackpot and "roshambo" (a.k.a. "rock, paper, scissors"). In fact, the term "GBK" mentioned here is a reference to "gunting, batu, kertas", an Indonesian term for scissors, rock, and paper respectively. There are some major differences from both games, which are winning requirements, battle and scoring mechanisms.

**Note:** In order to play on the website, please press the first, "MULAI" button. You can change the number players (minimum 2) in the field located on the left side of "MULAI".

Unlike normal roshambo, the scoring system allows the game to have more than two players. Eventually, some web browsers are able to generate and handle 100 players in a session. In this case, the scores are calculated based on the number of item pairs (e.g. paper vs rock) divided by players who chooses the winning item (i.e. paper) plus the amount of "X" (zonk) divided by the number of players that do not get the "X".

These items, including the "X", are determined from a jackpot. Unlike regular jackpot, items are randomized (through `Math.random()`, with mechanism to avoid same item to appear on subsequent randomization) instead of using jackpot wheels to determine the output.

Here, the players must choose at least two matching items in order to be selected for battle. If the player chose three, the selected item will be battled twice. Otherwise, the user hence get an "X".

# License
Copyright (c) 2017-2019 Reinhart Previano Koentjoro.
Unless stated otherwise, the source code for this project is licensed under [Apache License, Versions 2.0](http://www.apache.org/licenses/LICENSE-2.0).
