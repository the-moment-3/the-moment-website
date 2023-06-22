import { createStore } from 'ice';
import i18n from '@/models/i18n';
import task from '@/models/task';
import wallet from '@/models/wallet';
import onchain from '@/models/onchain';

export default createStore({ i18n, task, wallet, onchain });
