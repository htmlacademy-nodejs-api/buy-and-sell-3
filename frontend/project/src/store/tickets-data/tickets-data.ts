import {createSlice} from '@reduxjs/toolkit';
import {NameSpace} from '../../const';
import {TicketsState} from '../../types/state';

const initialState: TicketsState = {
  tickets: [],
  ticketsNew: [],
  ticketsDiscussed: [],
  isLoading: false,
};

export const ticketsData = createSlice({
  name: NameSpace.Tickets,
  initialState,
  reducers: {
    setTickets: (state, action) => {
      state.tickets = action.payload;
    },
    setTicketsNew: (state, action) => {
      state.ticketsNew = action.payload;
    },
    setTicketsDiscussed: (state, action) => {
      state.ticketsDiscussed = action.payload;
    },
    setTicketsLoading: (state, action) => {
      state.isLoading = action.payload;
    },
  },
});

export const {
  setTickets,
  setTicketsNew,
  setTicketsDiscussed,
  setTicketsLoading,
} = ticketsData.actions;
