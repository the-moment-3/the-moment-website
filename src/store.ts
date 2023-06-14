import { createStore } from 'ice';
import i18n from '@/models/i18n';
import siwe from '@/models/siwe';
import task from '@/models/task';
import onchain from '@/models/onchain';

export default createStore({ i18n, siwe, task, onchain });
